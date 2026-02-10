from fastapi import APIRouter, Query
from typing import Optional
from datetime import datetime
import math

from models.schemas import StandardResponse
from utils.data_loader import data_loader

router = APIRouter(prefix="/api/posts", tags=["Posts"])


@router.get("")
async def get_posts(
    platform: Optional[str] = Query("all", description="Filter by platform"),
    is_flagged: Optional[bool] = Query(None, description="Filter flagged posts"),
    search: Optional[str] = Query(None, description="Search in content"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """Get all posts with filtering and pagination"""
    
    # Filter posts
    posts = data_loader.filter_posts(
        platform=platform if platform != "all" else None,
        is_flagged=is_flagged
    )
    
    # Search filter
    if search:
        search_lower = search.lower()
        posts = [
            p for p in posts
            if search_lower in p.get("content", "").lower()
        ]
    
    # Enrich posts with campaign and account info
    enriched_posts = []
    for post in posts:
        post_copy = post.copy()
        
        # Add campaign title
        if post.get("campaign_id"):
            campaign = data_loader.get_campaign_by_id(post["campaign_id"])
            post_copy["campaign_title"] = campaign["title"] if campaign else "Unknown"
        else:
            post_copy["campaign_title"] = None
        
        # Add account username
        account = data_loader.get_account_by_id(post["account_id"])
        post_copy["account_username"] = account["username"] if account else "Unknown"
        
        enriched_posts.append(post_copy)
    
    # Sort by posted_at (most recent first)
    enriched_posts.sort(key=lambda x: x.get("posted_at", ""), reverse=True)
    
    # Pagination
    total_items = len(enriched_posts)
    total_pages = math.ceil(total_items / limit) if total_items > 0 else 1
    start_idx = (page - 1) * limit
    end_idx = start_idx + limit
    paginated_posts = enriched_posts[start_idx:end_idx]
    
    return StandardResponse(
        success=True,
        data={
            "posts": paginated_posts,
            "pagination": {
                "current_page": page,
                "total_pages": total_pages,
                "total_items": total_items,
                "items_per_page": limit,
                "has_next": page < total_pages,
                "has_previous": page > 1
            }
        },
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
