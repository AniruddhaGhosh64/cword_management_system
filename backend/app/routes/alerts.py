from fastapi import APIRouter
from app.services import alert_service
from app.models import schemas
from typing import List

router = APIRouter()

@router.get("/", response_model=List[schemas.Alert])
def get_alerts_endpoint():
    return alert_service.get_alerts()
