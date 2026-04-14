from pydantic import BaseModel
from typing import List, Optional

class CrowdData(BaseModel):
    zone: str
    density: int
    congestion: str
    capacity: int
    current: int
    predicted_density: int
    trend: str
    status: str
    simulated: bool = False

class ZoneToggle(BaseModel):
    zone: str
    status: str

class SpikeRequest(BaseModel):
    zone: str
    density: int

class Route(BaseModel):
    path: List[str]
    total_congestion: int
    reason: str

class QueueStatus(BaseModel):
    stall: str
    wait_time: int
    status: str
    recommended: bool

class Alert(BaseModel):
    type: str
    message: str
    action: Optional[str] = None
    timestamp: Optional[str] = None

class InsightData(BaseModel):
    most_crowded: str
    least_crowded: str
    avg_wait: int
    peak_zone: str
