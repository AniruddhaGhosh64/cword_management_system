from fastapi import APIRouter
from app.services import queue_service
from app.models import schemas
from typing import List

router = APIRouter()

@router.get("/", response_model=List[schemas.QueueStatus])
def get_queues():
    return queue_service.get_queue_status()
