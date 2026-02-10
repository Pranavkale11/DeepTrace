from fastapi import APIRouter, Query
from typing import Optional
from datetime import datetime
import math

from models.schemas import StandardResponse
from utils.data_loader import data_loader

router = APIRouter(prefix="/api/accounts", tags=["Accounts"])


@router.get("")
async def get_accounts(
    account_type: Optional[str] = Query("all", description="Filter by account type"),
    min_bot_probability: Optional[float] = Query(0, ge=0, le=100, description="Minimum bot score"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """Get all accounts with filtering and pagination"""
    
    # Filter accounts
    accounts = data_loader.filter_accounts(
        account_type=account_type if account_type != "all" else None,
        min_bot_probability=min_bot_probability if min_bot_probability > 0 else None
    )
    
    # Add campaigns_involved count
    enriched_accounts = []
    for account in accounts:
        account_copy = account.copy()
        
        # Count campaigns this account is involved in
        all_posts = data_loader.get_all_posts()
        account_posts = [p for p in all_posts if p["account_id"] == account["id"]]
        campaign_ids = set([p["campaign_id"] for p in account_posts if p.get("campaign_id")])
        account_copy["campaigns_involved"] = len(campaign_ids)
        
        enriched_accounts.append(account_copy)
    
    # Sort by bot_probability (highest first)
    enriched_accounts.sort(key=lambda x: x.get("bot_probability", 0), reverse=True)
    
    # Pagination
    total_items = len(enriched_accounts)
    total_pages = math.ceil(total_items / limit) if total_items > 0 else 1
    start_idx = (page - 1) * limit
    end_idx = start_idx + limit
    paginated_accounts = enriched_accounts[start_idx:end_idx]
    
    return StandardResponse(
        success=True,
        data={
            "accounts": paginated_accounts,
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
