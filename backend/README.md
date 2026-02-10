# DeepTrace Backend API

AI-powered cyber-intelligence platform backend built with FastAPI.

## 🚀 Quick Start

### Prerequisites
- Python 3.10 or higher
- pip (Python package manager)

### Installation

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment (recommended)**
```bash
python -m venv venv
```

3. **Activate virtual environment**

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

4. **Install dependencies**
```bash
pip install -r requirements.txt
```

### Running the Server

**Development mode (with auto-reload):**
```bash
uvicorn main:app --reload
```

**Production mode:**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Access the API

- **API Root**: http://localhost:8000/
- **Interactive Docs (Swagger)**: http://localhost:8000/docs
- **Alternative Docs (ReDoc)**: http://localhost:8000/redoc

## 📁 Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── api/                    # API route handlers
│   ├── campaigns.py       # Campaign endpoints
│   ├── analytics.py       # Analytics endpoints
│   ├── posts.py           # Posts endpoints
│   ├── accounts.py        # Accounts endpoints
│   ├── reports.py         # Reports endpoints
│   └── analyze.py         # Analysis trigger endpoint
├── mock_data/             # Mock JSON data files
│   ├── campaigns.json
│   ├── posts.json
│   ├── accounts.json
│   ├── threat_scores.json
│   └── reports.json
├── models/                # Pydantic schemas
│   └── schemas.py
└── utils/                 # Utility functions
    └── data_loader.py     # Mock data loader
```

## 🔌 API Endpoints

### Campaigns
- `GET /api/campaigns` - List all campaigns (with filters)
- `GET /api/campaigns/{id}` - Get campaign details
- `GET /api/campaigns/{id}/posts` - Get campaign posts
- `GET /api/campaigns/{id}/accounts` - Get campaign accounts

### Analytics
- `GET /api/analytics/overview` - Dashboard overview stats
- `GET /api/analytics/threats` - Threat analytics

### Posts
- `GET /api/posts` - List all posts (with filters)

### Accounts
- `GET /api/accounts` - List all accounts (with filters)

### Reports
- `GET /api/reports` - List intelligence reports
- `GET /api/reports/{id}` - Get report details

### Analysis
- `POST /api/analyze` - Trigger analysis (demo)

## 🎯 Features

✅ **Mock Data**: Fully functional with JSON mock data  
✅ **CORS Enabled**: Ready for frontend integration  
✅ **Auto Documentation**: Swagger UI and ReDoc  
✅ **Type Safety**: Pydantic models for validation  
✅ **Filtering & Pagination**: All list endpoints support filtering  
✅ **Demo-Ready**: Fast responses, no external dependencies  

## 🛠️ Development

### Adding New Endpoints

1. Create a new router file in `api/`
2. Define routes using FastAPI decorators
3. Import and include router in `main.py`

### Modifying Mock Data

Edit JSON files in `mock_data/` directory. Changes will be reflected on server restart.

## 📝 Notes

- This backend uses **mock data** for demo purposes
- No database required for initial setup
- All data is loaded from JSON files at startup
- CORS is configured to allow all origins (change in production)

## 🔜 Next Steps

1. ✅ Backend setup complete
2. ⏭️ Connect frontend to backend
3. ⏭️ Replace mock data with real database
4. ⏭️ Implement actual AI detection algorithms

## 📞 Support

For issues or questions, refer to the main project documentation.
