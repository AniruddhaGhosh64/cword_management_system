from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.services import crowd_service
from app.models import schemas

router = APIRouter()

@router.post("/toggle-zone")
def toggle_zone_status(payload: schemas.ZoneToggle):
    # Pre-validate input
    valid_zones = [z["zone"] for z in crowd_service.ZONES_STATE]
    
    if payload.zone not in valid_zones:
        return JSONResponse(
            status_code=404,
            content={
                "error": "Zone not found",
                "available_zones": valid_zones
            }
        )
        
    if payload.status not in ["open", "closed"]:
        return JSONResponse(
            status_code=400,
            content={
                "error": "Invalid status. Must be 'open' or 'closed'."
            }
        )
        
    # Process
    success = crowd_service.toggle_zone(payload.zone, payload.status)
    return {"message": f"Successfully marked zone {payload.zone} as {payload.status}"}

@router.post("/simulate-spike")
def simulate_spike(payload: schemas.SpikeRequest):
    valid_zones = [z["zone"] for z in crowd_service.ZONES_STATE]
    if payload.zone not in valid_zones:
        return JSONResponse(status_code=404, content={"error": "Zone not found", "available_zones": valid_zones})
    if not (0 <= payload.density <= 100):
        return JSONResponse(status_code=400, content={"error": "Density must be between 0 and 100"})
    crowd_service.simulate_spike(payload.zone, payload.density)
    return {"message": f"Spike simulated on Zone {payload.zone} at {payload.density}% density"}

@router.post("/reset-spike")
def reset_spike(payload: schemas.ZoneToggle):
    crowd_service.reset_spike(payload.zone)
    return {"message": f"Spike reset for Zone {payload.zone}"}

@router.post("/reset-all-spikes")
def reset_all_spikes():
    crowd_service.reset_all_spikes()
    return {"message": "All simulations cleared"}

