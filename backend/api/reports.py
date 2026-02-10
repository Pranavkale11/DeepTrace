from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from datetime import datetime
import math

from models.schemas import StandardResponse
from utils.data_loader import data_loader

router = APIRouter(prefix="/api/reports", tags=["Reports"])


@router.get("")
async def get_reports(
    status: Optional[str] = Query("published", description="Filter by status"),
    severity: Optional[str] = Query("all", description="Filter by severity"),
    report_type: Optional[str] = Query("all", description="Filter by report type"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    """Get list of intelligence reports with filtering and pagination"""
    
    # Filter reports
    reports = data_loader.filter_reports(
        status=status if status != "all" else None,
        severity=severity if severity != "all" else None,
        report_type=report_type if report_type != "all" else None
    )
    
    # Enrich reports with campaign title
    enriched_reports = []
    for report in reports:
        report_copy = report.copy()
        
        # Add campaign title if campaign_id exists
        if report.get("campaign_id"):
            campaign = data_loader.get_campaign_by_id(report["campaign_id"])
            report_copy["campaign_title"] = campaign["title"] if campaign else "Unknown"
        else:
            report_copy["campaign_title"] = None
        
        enriched_reports.append(report_copy)
    
    # Sort by generated_at (most recent first)
    enriched_reports.sort(key=lambda x: x.get("generated_at", ""), reverse=True)
    
    # Pagination
    total_items = len(enriched_reports)
    total_pages = math.ceil(total_items / limit) if total_items > 0 else 1
    start_idx = (page - 1) * limit
    end_idx = start_idx + limit
    paginated_reports = enriched_reports[start_idx:end_idx]
    
    return StandardResponse(
        success=True,
        data={
            "reports": paginated_reports,
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


@router.get("/{report_id}")
async def get_report_detail(report_id: str):
    """Get full details of a specific intelligence report"""
    
    # Get report
    report = data_loader.get_report_by_id(report_id)
    if not report:
        raise HTTPException(
            status_code=404,
            detail=f"Report with ID '{report_id}' not found"
        )
    
    # Enrich with campaign title
    report_copy = report.copy()
    if report.get("campaign_id"):
        campaign = data_loader.get_campaign_by_id(report["campaign_id"])
        report_copy["campaign_title"] = campaign["title"] if campaign else "Unknown"
    else:
        report_copy["campaign_title"] = None
    
    return StandardResponse(
        success=True,
        data={
            "report": report_copy
        },
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
