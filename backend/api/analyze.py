from fastapi import APIRouter
from datetime import datetime
import time
import random
import string

from models.schemas import AnalyzeRequest, AnalyzeResponse
from utils.data_loader import data_loader

router = APIRouter(prefix="/api", tags=["Analysis"])


def generate_id(prefix: str) -> str:
    """Generate a random ID"""
    random_suffix = ''.join(random.choices(string.digits, k=3))
    return f"{prefix}_{random_suffix}"


@router.post("/analyze")
async def trigger_analysis(request: AnalyzeRequest = None):
    """
    Simulate running the AI detection engine (for demo purposes)
    
    This endpoint simulates processing time and returns mock detected campaigns
    """
    
    # Use default values if no request body provided
    if request is None:
        request = AnalyzeRequest()
    
    # Simulate processing time (3-5 seconds)
    processing_time = random.uniform(3, 5)
    start_time = datetime.utcnow()
    
    # In a real implementation, you would:
    # 1. Fetch data from social media APIs
    # 2. Run detection algorithms
    # 3. Store results in database
    # For demo, we just wait a bit
    time.sleep(processing_time)
    
    end_time = datetime.utcnow()
    
    # Generate mock results
    analysis_id = generate_id("analysis")
    
    # Create 1-2 new mock campaigns
    num_new_campaigns = random.randint(1, 2)
    new_campaigns = []
    
    for i in range(num_new_campaigns):
        campaign_id = generate_id("camp")
        
        threat_levels = ["low", "medium", "high"]
        threat_level = random.choice(threat_levels)
        
        campaign_types = ["political", "commercial", "malware"]
        campaign_type = random.choice(campaign_types)
        
        titles = [
            "New Coordinated Campaign Detected",
            "Suspicious Hashtag Spread",
            "Bot Network Activity",
            "Misinformation Campaign"
        ]
        
        new_campaign = {
            "id": campaign_id,
            "title": random.choice(titles),
            "threat_level": threat_level,
            "total_posts": random.randint(30, 100),
            "total_accounts": random.randint(10, 50),
            "confidence_score": round(random.uniform(60, 95), 1)
        }
        new_campaigns.append(new_campaign)
    
    # Mock analysis results
    results = {
        "posts_analyzed": random.randint(500, 2000),
        "campaigns_detected": num_new_campaigns,
        "new_campaigns": new_campaigns,
        "accounts_flagged": random.randint(10, 30),
        "bot_accounts_detected": random.randint(5, 15)
    }
    
    return AnalyzeResponse(
        success=True,
        data={
            "analysis_id": analysis_id,
            "status": "completed",
            "started_at": start_time.isoformat() + "Z",
            "completed_at": end_time.isoformat() + "Z",
            "duration_seconds": round(processing_time, 2),
            "results": results
        },
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
