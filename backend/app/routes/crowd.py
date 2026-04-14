from fastapi import APIRouter
from app.services import crowd_service
from app.models import schemas
from typing import List

router = APIRouter()

@router.get("/", response_model=List[schemas.CrowdData])
def get_crowd():
    return crowd_service.get_crowd_data()
