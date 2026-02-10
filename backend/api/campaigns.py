from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from datetime import datetime
import math

from models.schemas import StandardResponse, ErrorResponse
from utils.data_loader import data_loader

router = APIRouter(prefix="/api/campaigns", tags=["Campaigns"])


@router.get("")
async def get_campaigns(
    status: Optional[str] = Query("all", description="Filter by status"),
    threat_level: Optional[str] = Query("all", description="Filter by threat level"),
    campaign_type: Optional[str] = Query("all", description="Filter by campaign type"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    sort_by: str = Query("detected_at", description="Sort field"),
    order: str = Query("desc", description="Sort order (asc/desc)")
):
    """Get list of campaigns with filtering and pagination"""
    
    # Filter campaigns
    campaigns = data_loader.filter_campaigns(
        status=status,
        threat_level=threat_level,
        campaign_type=campaign_type
    )
    
    # Sort campaigns
    reverse = (order == "desc")
    if sort_by in ["detected_at", "last_activity", "created_at", "updated_at"]:
        campaigns.sort(key=lambda x: x.get(sort_by, ""), reverse=reverse)
    elif sort_by in ["total_posts", "total_accounts", "confidence_score"]:
        campaigns.sort(key=lambda x: x.get(sort_by, 0), reverse=reverse)
    
    # Pagination
    total_items = len(campaigns)
    total_pages = math.ceil(total_items / limit) if total_items > 0 else 1
    start_idx = (page - 1) * limit
    end_idx = start_idx + limit
    paginated_campaigns = campaigns[start_idx:end_idx]
    
    return StandardResponse(
        success=True,
        data={
            "campaigns": paginated_campaigns,
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


@router.get("/{campaign_id}")
async def get_campaign_detail(campaign_id: str):
    """Get detailed information about a specific campaign"""
    
    # Get campaign
    campaign = data_loader.get_campaign_by_id(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=404,
            detail=f"Campaign with ID '{campaign_id}' not found"
        )
    
    # Get threat analysis
    threat_analysis = data_loader.get_threat_score_by_campaign(campaign_id)
    
    # Get posts for this campaign
    posts = data_loader.get_posts_by_campaign(campaign_id)
    
    # Calculate top hashtags
    hashtag_counts = {}
    for post in posts:
        for tag in post.get("hashtags", []):
            hashtag_counts[tag] = hashtag_counts.get(tag, 0) + 1
    
    top_hashtags = [
        {"tag": tag, "count": count}
        for tag, count in sorted(hashtag_counts.items(), key=lambda x: x[1], reverse=True)[:10]
    ]
    
    # Calculate platform breakdown
    platform_counts = {}
    for post in posts:
        platform = post.get("platform", "other")
        platform_counts[platform] = platform_counts.get(platform, 0) + 1
    
    total_posts = len(posts)
    platform_breakdown = [
        {
            "platform": platform,
            "post_count": count,
            "percentage": round((count / total_posts * 100), 1) if total_posts > 0 else 0
        }
        for platform, count in platform_counts.items()
    ]
    
    # Generate mock timeline (simplified)
    timeline = [
        {"date": "2026-02-04T10:00:00Z", "post_count": 15},
        {"date": "2026-02-04T11:00:00Z", "post_count": 89},
        {"date": "2026-02-04T12:00:00Z", "post_count": 67},
        {"date": "2026-02-04T13:00:00Z", "post_count": 43},
        {"date": "2026-02-04T14:00:00Z", "post_count": 33}
    ]
    
    # Build response
    campaign_detail = campaign.copy()
    
    return StandardResponse(
        success=True,
        data={
            "campaign": campaign_detail,
            "threat_analysis": threat_analysis,
            "top_hashtags": top_hashtags,
            "platform_breakdown": platform_breakdown,
            "timeline": timeline
        },
        timestamp=datetime.utcnow().isoformat() + "Z"
    )


@router.get("/{campaign_id}/posts")
async def get_campaign_posts(
    campaign_id: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    sort_by: str = Query("posted_at", description="Sort field")
):
    """Get all posts for a specific campaign"""
    
    # Verify campaign exists
    campaign = data_loader.get_campaign_by_id(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=404,
            detail=f"Campaign with ID '{campaign_id}' not found"
        )
    
    # Get posts
    posts = data_loader.get_posts_by_campaign(campaign_id)
    
    # Sort posts
    if sort_by == "posted_at":
        posts.sort(key=lambda x: x.get("posted_at", ""), reverse=True)
    elif sort_by == "engagement_count":
        posts.sort(key=lambda x: x.get("engagement_count", 0), reverse=True)
    
    # Add account usernames to posts
    enriched_posts = []
    for post in posts:
        account = data_loader.get_account_by_id(post["account_id"])
        post_copy = post.copy()
        post_copy["account_username"] = account["username"] if account else "Unknown"
        enriched_posts.append(post_copy)
    
    # Pagination
    total_items = len(enriched_posts)
    total_pages = math.ceil(total_items / limit) if total_items > 0 else 1
    start_idx = (page - 1) * limit
    end_idx = start_idx + limit
    paginated_posts = enriched_posts[start_idx:end_idx]
    
    return StandardResponse(
        success=True,
        data={
            "campaign_id": campaign_id,
            "campaign_title": campaign["title"],
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


@router.get("/{campaign_id}/accounts")
async def get_campaign_accounts(campaign_id: str):
    """Get all accounts involved in a specific campaign"""
    
    # Verify campaign exists
    campaign = data_loader.get_campaign_by_id(campaign_id)
    if not campaign:
        raise HTTPException(
            status_code=404,
            detail=f"Campaign with ID '{campaign_id}' not found"
        )
    
    # Get accounts
    accounts = data_loader.get_accounts_by_campaign(campaign_id)
    
    # Calculate bot percentage
    bot_count = sum(1 for acc in accounts if acc["account_type"] == "bot")
    bot_percentage = round((bot_count / len(accounts) * 100), 1) if accounts else 0
    
    # Generate network graph (simplified)
    nodes = [
        {
            "id": acc["id"],
            "label": acc["username"],
            "type": acc["account_type"],
            "size": acc.get("post_count_in_campaign", 1)
        }
        for acc in accounts[:20]  # Limit to first 20 for performance
    ]
    
    # Create some mock edges (connections between accounts)
    edges = []
    for i in range(min(len(nodes) - 1, 10)):
        edges.append({
            "source": nodes[i]["id"],
            "target": nodes[i + 1]["id"],
            "weight": 5
        })
    
    return StandardResponse(
        success=True,
        data={
            "campaign_id": campaign_id,
            "campaign_title": campaign["title"],
            "total_accounts": len(accounts),
            "bot_percentage": bot_percentage,
            "accounts": accounts,
            "network_graph": {
                "nodes": nodes,
                "edges": edges
            }
        },
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
