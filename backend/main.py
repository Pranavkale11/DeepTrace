from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# Import routers
from api import campaigns, analytics, posts, accounts, reports, analyze

# Create FastAPI app
app = FastAPI(
    title="DeepTrace API",
    description="AI-powered cyber-intelligence platform for detecting coordinated influence and disinformation campaigns",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(campaigns.router)
app.include_router(analytics.router)
app.include_router(posts.router)
app.include_router(accounts.router)
app.include_router(reports.router)
app.include_router(analyze.router)


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint - API health check"""
    return {
        "success": True,
        "message": "DeepTrace API is running",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "docs": "/docs",
        "endpoints": {
            "campaigns": "/api/campaigns",
            "analytics": "/api/analytics/overview",
            "posts": "/api/posts",
            "accounts": "/api/accounts",
            "reports": "/api/reports",
            "analyze": "/api/analyze"
        }
    }


# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }


# Startup event
@app.on_event("startup")
async def startup_event():
    """Run on application startup"""
    print("=" * 60)
    print("🚀 DeepTrace Backend API Starting...")
    print("=" * 60)
    print("📚 API Documentation: http://localhost:8000/docs")
    print("📖 ReDoc Documentation: http://localhost:8000/redoc")
    print("🔍 Root Endpoint: http://localhost:8000/")
    print("=" * 60)


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Run on application shutdown"""
    print("=" * 60)
    print("🛑 DeepTrace Backend API Shutting Down...")
    print("=" * 60)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
