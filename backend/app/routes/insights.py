from fastapi import APIRouter
from app.services import insights_service
from app.models import schemas

router = APIRouter()

@router.get("/", response_model=schemas.InsightData)
def get_insights_endpoint():
    return insights_service.get_insights()
