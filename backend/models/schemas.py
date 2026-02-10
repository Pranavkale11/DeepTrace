from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


# Enums
class ThreatLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"


class CampaignStatus(str, Enum):
    active = "active"
    monitoring = "monitoring"
    resolved = "resolved"
    archived = "archived"


class Platform(str, Enum):
    twitter = "twitter"
    facebook = "facebook"
    reddit = "reddit"
    telegram = "telegram"
    other = "other"


class AccountType(str, Enum):
    human = "human"
    bot = "bot"
    suspicious = "suspicious"
    unknown = "unknown"


class ReportType(str, Enum):
    campaign_analysis = "campaign_analysis"
    threat_summary = "threat_summary"
    trend_report = "trend_report"
    custom = "custom"


class ReportStatus(str, Enum):
    draft = "draft"
    published = "published"
    archived = "archived"


class Severity(str, Enum):
    info = "info"
    low = "low"
    medium = "medium"
    high = "high"
    critical = "critical"


# Campaign Schemas
class Campaign(BaseModel):
    id: str
    title: str
    description: str
    threat_level: ThreatLevel
    status: CampaignStatus
    campaign_type: str
    detected_at: str
    last_activity: str
    total_posts: int
    total_accounts: int
    reach_estimate: int
    confidence_score: float
    created_at: str
    updated_at: str


class CampaignDetail(Campaign):
    threat_analysis: Optional[Dict[str, Any]] = None
    top_hashtags: Optional[List[Dict[str, Any]]] = None
    platform_breakdown: Optional[List[Dict[str, Any]]] = None
    timeline: Optional[List[Dict[str, Any]]] = None


# Post Schemas
class Post(BaseModel):
    id: str
    campaign_id: Optional[str] = None
    account_id: str
    platform: Platform
    platform_post_id: str
    content: str
    content_hash: str
    media_urls: List[str] = []
    hashtags: List[str] = []
    mentions: List[str] = []
    posted_at: str
    engagement_count: int
    sentiment_score: float
    is_flagged: bool
    created_at: str


class PostWithDetails(Post):
    campaign_title: Optional[str] = None
    account_username: Optional[str] = None


# Account Schemas
class Account(BaseModel):
    id: str
    platform: Platform
    platform_user_id: str
    username: str
    account_created_at: str
    follower_count: int
    following_count: int
    post_count: int
    verified: bool
    bot_probability: float
    account_type: AccountType
    risk_score: float
    first_seen: str
    last_active: str
    metadata: Optional[Dict[str, Any]] = None


class AccountWithCampaigns(Account):
    campaigns_involved: Optional[int] = None
    post_count_in_campaign: Optional[int] = None
    first_post_at: Optional[str] = None
    last_post_at: Optional[str] = None


# Threat Score Schemas
class ThreatScore(BaseModel):
    id: str
    campaign_id: str
    coordination_score: float
    bot_involvement_score: float
    content_similarity_score: float
    timing_pattern_score: float
    network_density_score: float
    overall_threat_score: float
    detection_method: str
    analyzed_at: str
    analysis_metadata: Optional[Dict[str, Any]] = None


# Report Schemas
class Report(BaseModel):
    id: str
    campaign_id: Optional[str] = None
    report_type: ReportType
    title: str
    summary: str
    severity: Severity
    status: ReportStatus
    tags: List[str] = []
    generated_by: str
    generated_at: str
    published_at: Optional[str] = None
    views_count: int


class ReportDetail(Report):
    campaign_title: Optional[str] = None
    full_content: str
    metadata: Optional[Dict[str, Any]] = None


# Analytics Schemas
class OverviewStats(BaseModel):
    total_campaigns: int
    active_threats: int
    high_risk_campaigns: int
    total_accounts_monitored: int
    total_posts_analyzed: int
    bot_accounts_detected: int


class ThreatDistribution(BaseModel):
    critical: int
    high: int
    medium: int
    low: int


class PlatformBreakdown(BaseModel):
    platform: str
    campaign_count: int
    percentage: float


class RecentActivity(BaseModel):
    new_campaigns: int
    new_posts: int
    new_accounts: int


class TrendDataPoint(BaseModel):
    date: str
    campaigns: int
    posts: int


class AnalyticsOverview(BaseModel):
    stats: OverviewStats
    threat_distribution: ThreatDistribution
    platform_breakdown: List[PlatformBreakdown]
    recent_activity: Dict[str, RecentActivity]
    trend_data: List[TrendDataPoint]


# Pagination Schema
class Pagination(BaseModel):
    current_page: int
    total_pages: int
    total_items: int
    items_per_page: int
    has_next: bool
    has_previous: bool


# Response Schemas
class CampaignsResponse(BaseModel):
    success: bool = True
    data: Dict[str, Any]
    timestamp: str


class StandardResponse(BaseModel):
    success: bool = True
    data: Dict[str, Any]
    timestamp: str


class ErrorResponse(BaseModel):
    success: bool = False
    error: Dict[str, Any]
    timestamp: str


# Analysis Request/Response
class AnalyzeRequest(BaseModel):
    source: Optional[str] = "twitter"
    keywords: Optional[List[str]] = []
    time_range: Optional[str] = "24h"


class AnalyzeResponse(BaseModel):
    success: bool = True
    data: Dict[str, Any]
    timestamp: str
