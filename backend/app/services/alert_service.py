from app.services.crowd_service import get_crowd_data
from app.services.queue_service import get_queue_status
import time

def seconds_ago(ts):
    diff = int(time.time() - ts)
    if diff < 5: return "just now"
    if diff < 60: return f"{diff} seconds ago"
    return f"{diff // 60} min ago"

def get_alerts():
    crowd_data = get_crowd_data()
    queue_data = get_queue_status()
    now = time.time()
    
    alerts = []
    
    # Find least crowded open zone for action hints
    open_zones = [z for z in crowd_data if z["status"] == "open"]
    least_crowded = min(open_zones, key=lambda z: z["density"]) if open_zones else None

    for zone in crowd_data:
        if zone["status"] == "closed":
            continue

        is_high = zone["density"] > 80
        is_increasing = zone["trend"] == "increasing"
        pred_critical = zone.get("predicted_density", 0) > 85

        if is_high and is_increasing:
            hint = f"Use Zone {least_crowded['zone']} instead" if least_crowded and least_crowded["zone"] != zone["zone"] else "Avoid this zone"
            alerts.append({
                "type": "critical",
                "message": f"Critical congestion at Zone {zone['zone']} and rising fast",
                "action": hint,
                "timestamp": seconds_ago(now)
            })
        elif is_high:
            alerts.append({
                "type": "warning",
                "message": f"High congestion at Zone {zone['zone']}",
                "action": f"Consider Zone {least_crowded['zone']}" if least_crowded and least_crowded["zone"] != zone["zone"] else None,
                "timestamp": seconds_ago(now)
            })
        elif pred_critical:
            alerts.append({
                "type": "warning",
                "message": f"Incoming congestion predicted at Zone {zone['zone']}",
                "action": "Plan alternate route now",
                "timestamp": seconds_ago(now)
            })

    fastest_stall = None
    min_wait = 999

    for q in queue_data:
        if q["wait_time"] > 12:
            alerts.append({
                "type": "warning",
                "message": f"Long wait at {q['stall']} — {q['wait_time']} mins",
                "action": None,
                "timestamp": seconds_ago(now)
            })
        if q["wait_time"] < min_wait:
            min_wait = q["wait_time"]
            fastest_stall = q["stall"]

    if fastest_stall:
        alerts.append({
            "type": "suggestion",
            "message": f"{fastest_stall} stall has the shortest queue",
            "action": f"Head there now — only {min_wait} min wait",
            "timestamp": seconds_ago(now)
        })

    return alerts
