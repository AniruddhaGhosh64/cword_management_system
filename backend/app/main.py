from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import crowd, routing, queues, alerts, admin, insights

app = FastAPI(title="Smart Stadium Crowd Management System")

# Configure CORS for Cloud Run deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now (demo/hackathon)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(crowd.router, prefix="/api/crowd", tags=["Crowd"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(routing.router, prefix="/api/routing", tags=["Routing"])
app.include_router(insights.router, prefix="/api/insights", tags=["Insights"])
app.include_router(queues.router, prefix="/api/queues", tags=["Queues"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])

@app.get("/")
@app.get("/api")
def read_root():
    return {
        "status": "ok",
        "message": "Smart Stadium API is running",
        "endpoints": {
            "crowd": "/api/crowd",
            "routing": "/api/routing",
            "queues": "/api/queues",
            "alerts": "/api/alerts",
            "admin": "/api/admin",
            "insights": "/api/insights"
        }
    }
