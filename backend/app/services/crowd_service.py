import random

# Base state for zones, preserving previous density state for prediction logic
ZONES_STATE = [
    {"zone": "A1", "capacity": 1000, "current": 800, "prev_density": 80, "status": "open"},
    {"zone": "B2", "capacity": 1500, "current": 600, "prev_density": 40, "status": "open"},
    {"zone": "C3", "capacity": 2000, "current": 1500, "prev_density": 75, "status": "open"},
    {"zone": "D4", "capacity": 800, "current": 200, "prev_density": 25, "status": "open"}
]

# What-If spike overrides: { zone_id -> density_override (0-100) }
SPIKE_OVERRIDES: dict = {}

def simulate_spike(zone_id: str, density: int):
    SPIKE_OVERRIDES[zone_id] = max(0, min(100, density))
    return True

def reset_spike(zone_id: str):
    SPIKE_OVERRIDES.pop(zone_id, None)
    return True

def reset_all_spikes():
    SPIKE_OVERRIDES.clear()
    return True

def get_congestion_level(density: int) -> str:
    if density <= 40:
        return "low"
    elif density <= 70:
        return "medium"
    else:
        return "high"

def toggle_zone(zone_id: str, status: str):
    for zone in ZONES_STATE:
        if zone["zone"] == zone_id:
            zone["status"] = status
            return True
    return False

def get_crowd_data():
    result = []
    for zone in ZONES_STATE:
        if zone["status"] != "closed":
            # Fluctuate by -5% to +5% of capacity
            max_fluctuation = max(1, int(zone["capacity"] * 0.05))
            fluctuation = random.randint(-max_fluctuation, max_fluctuation)
            
            zone["current"] += fluctuation
            
            # Clamp between 0 and capacity
            zone["current"] = max(0, min(zone["current"], zone["capacity"]))
        
        # Apply What-If spike override if active (bypasses natural simulation)
        if zone["zone"] in SPIKE_OVERRIDES:
            density = SPIKE_OVERRIDES[zone["zone"]]
            zone["current"] = int((density / 100) * zone["capacity"])
        else:
            density = int((zone["current"] / zone["capacity"]) * 100)

        # Analytical Predictive logic relying on prior state
        prev_density = zone.get("prev_density", density)
        if zone["status"] == "closed":
            trend = "stable"
            predicted_density = density
        else:
            if density > prev_density:
                trend = "increasing"
                pred_fluctuation = random.randint(5, 10)
                predicted_density = min(100, density + pred_fluctuation)
            elif density < prev_density:
                trend = "decreasing"
                pred_fluctuation = random.randint(5, 10)
                predicted_density = max(0, density - pred_fluctuation)
            else:
                trend = "stable"
                predicted_density = density
            
        # Stamp new baseline
        zone["prev_density"] = density
        
        result.append({
            "zone": zone["zone"],
            "density": density,
            "congestion": get_congestion_level(density) if zone["status"] != "closed" else "none",
            "capacity": zone["capacity"],
            "current": zone["current"],
            "predicted_density": predicted_density,
            "trend": trend,
            "status": zone["status"],
            "simulated": zone["zone"] in SPIKE_OVERRIDES
        })
        
    return result
