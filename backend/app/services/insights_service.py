from app.services.crowd_service import get_crowd_data
from app.services.queue_service import get_queue_status

def get_insights():
    crowd_data = get_crowd_data()
    queue_data = get_queue_status()
    
    # Exclude formally closed zones from analytics
    open_zones = [z for z in crowd_data if z["status"] == "open"]
    
    if not open_zones:
        return {
            "most_crowded": "None",
            "least_crowded": "None",
            "avg_wait": 0,
            "peak_zone": "None"
        }
        
    most_crowded = max(open_zones, key=lambda z: z["density"])
    least_crowded = min(open_zones, key=lambda z: z["density"])
    peak_zone = max(open_zones, key=lambda z: z["predicted_density"])
    
    avg_wait = sum([q["wait_time"] for q in queue_data]) / len(queue_data) if len(queue_data) > 0 else 0
    
    return {
        "most_crowded": most_crowded["zone"],
        "least_crowded": least_crowded["zone"],
        "avg_wait": int(avg_wait),
        "peak_zone": peak_zone["zone"]
    }
