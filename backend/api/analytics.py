from fastapi import APIRouter, Query
from typing import Optional
from datetime import datetime, timedelta

from models.schemas import StandardResponse
from utils.data_loader import data_loader

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


@router.get("/overview")
async def get_analytics_overview():
    """Get high-level statistics for the dashboard homepage"""
    
    campaigns = data_loader.get_all_campaigns()
    accounts = data_loader.get_all_accounts()
    posts = data_loader.get_all_posts()
    
    # Calculate stats
    total_campaigns = len(campaigns)
    active_threats = len([c for c in campaigns if c["status"] == "active"])
    high_risk_campaigns = len([c for c in campaigns if c["threat_level"] in ["high", "critical"]])
    total_accounts_monitored = len(accounts)
    total_posts_analyzed = len(posts)
    bot_accounts_detected = len([a for a in accounts if a["account_type"] == "bot"])
    
    # Threat distribution
    threat_distribution = {
        "critical": len([c for c in campaigns if c["threat_level"] == "critical"]),
        "high": len([c for c in campaigns if c["threat_level"] == "high"]),
        "medium": len([c for c in campaigns if c["threat_level"] == "medium"]),
        "low": len([c for c in campaigns if c["threat_level"] == "low"])
    }
    
    # Platform breakdown
    platform_counts = {}
    for campaign in campaigns:
        # Get posts for this campaign
        campaign_posts = data_loader.get_posts_by_campaign(campaign["id"])
        for post in campaign_posts:
            platform = post.get("platform", "other")
            if platform not in platform_counts:
                platform_counts[platform] = set()
            platform_counts[platform].add(campaign["id"])
    
    platform_breakdown = []
    for platform, campaign_ids in platform_counts.items():
        count = len(campaign_ids)
        platform_breakdown.append({
            "platform": platform,
            "campaign_count": count,
            "percentage": round((count / total_campaigns * 100), 1) if total_campaigns > 0 else 0
        })
    
    # Sort by count
    platform_breakdown.sort(key=lambda x: x["campaign_count"], reverse=True)
    
    # Recent activity (mock data for demo)
    recent_activity = {
        "last_24h": {
            "new_campaigns": 3,
            "new_posts": 1247,
            "new_accounts": 89
        },
        "last_7d": {
            "new_campaigns": 15,
            "new_posts": 8934,
            "new_accounts": 421
        }
    }
    
    # Trend data (last 7 days)
    trend_data = [
        {"date": "2026-01-29", "campaigns": 2, "posts": 450},
        {"date": "2026-01-30", "campaigns": 3, "posts": 678},
        {"date": "2026-01-31", "campaigns": 1, "posts": 234},
        {"date": "2026-02-01", "campaigns": 4, "posts": 892},
        {"date": "2026-02-02", "campaigns": 2, "posts": 567},
        {"date": "2026-02-03", "campaigns": 5, "posts": 1123},
        {"date": "2026-02-04", "campaigns": 3, "posts": 1247}
    ]
    
    return StandardResponse(
        success=True,
        data={
            "stats": {
                "total_campaigns": total_campaigns,
                "active_threats": active_threats,
                "high_risk_campaigns": high_risk_campaigns,
                "total_accounts_monitored": total_accounts_monitored,
                "total_posts_analyzed": total_posts_analyzed,
                "bot_accounts_detected": bot_accounts_detected
            },
            "threat_distribution": threat_distribution,
            "platform_breakdown": platform_breakdown,
            "recent_activity": recent_activity,
            "trend_data": trend_data
        },
        timestamp=datetime.utcnow().isoformat() + "Z"
    )


@router.get("/threats")
async def get_threat_analytics(
    period: str = Query("7d", description="Time period: 24h, 7d, 30d, all")
):
    """Get threat-specific analytics for charts and visualizations"""
    
    campaigns = data_loader.get_all_campaigns()
    
    # Threat trends (mock data based on period)
    if period == "7d":
        threat_trends = [
            {"date": "2026-01-29", "critical": 0, "high": 1, "medium": 3, "low": 2},
            {"date": "2026-01-30", "critical": 1, "high": 2, "medium": 4, "low": 3},
            {"date": "2026-01-31", "critical": 0, "high": 1, "medium": 2, "low": 1},
            {"date": "2026-02-01", "critical": 0, "high": 2, "medium": 5, "low": 4},
            {"date": "2026-02-02", "critical": 1, "high": 1, "medium": 3, "low": 2},
            {"date": "2026-02-03", "critical": 0, "high": 3, "medium": 6, "low": 5},
            {"date": "2026-02-04", "critical": 2, "high": 2, "medium": 4, "low": 3}
        ]
    else:
        # Default to 7d for demo
        threat_trends = [
            {"date": "2026-01-29", "critical": 0, "high": 1, "medium": 3, "low": 2},
            {"date": "2026-01-30", "critical": 1, "high": 2, "medium": 4, "low": 3}
        ]
    
    # Campaign type distribution
    type_counts = {}
    for campaign in campaigns:
        campaign_type = campaign.get("campaign_type", "other")
        type_counts[campaign_type] = type_counts.get(campaign_type, 0) + 1
    
    total_campaigns = len(campaigns)
    campaign_type_distribution = [
        {
            "type": ctype,
            "count": count,
            "percentage": round((count / total_campaigns * 100), 1) if total_campaigns > 0 else 0
        }
        for ctype, count in type_counts.items()
    ]
    campaign_type_distribution.sort(key=lambda x: x["count"], reverse=True)
    
    # Top threat indicators (mock data)
    top_threat_indicators = [
        {"indicator": "High content similarity", "frequency": 32},
        {"indicator": "Bot involvement", "frequency": 28},
        {"indicator": "Coordinated timing", "frequency": 24},
        {"indicator": "Suspicious accounts", "frequency": 19}
    ]
    
    return StandardResponse(
        success=True,
        data={
            "threat_trends": threat_trends,
            "campaign_type_distribution": campaign_type_distribution,
            "top_threat_indicators": top_threat_indicators
        },
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
