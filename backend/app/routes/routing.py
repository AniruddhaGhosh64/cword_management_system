from fastapi import APIRouter
from app.services import routing_service
from app.models import schemas
from typing import List

router = APIRouter()

@router.get("/", response_model=List[schemas.Route])
def get_routes():
    return routing_service.get_optimal_routes()

@router.get("/personalized-route", response_model=schemas.Route)
def get_personalized_route(start: str, end: str, type: str):
    return routing_service.get_personalized_route(start, end, type)
