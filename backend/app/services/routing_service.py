from app.services.crowd_service import get_crowd_data

def get_optimal_routes():
    crowd_data = get_crowd_data()
    
    # Create indexed maps for density and closure status
    density_map = {item["zone"]: item["density"] for item in crowd_data}
    status_map = {item["zone"]: item["status"] for item in crowd_data}
    
    possible_paths = [
        ["A1", "B2"],
        ["C3", "D4"],
        ["A1", "D4"],
        ["B2", "C3"]
    ]
    
    evaluated_routes = []
    for path in possible_paths:
        total_weight = 0
        has_high_density = False
        is_blocked = False
        
        for zone in path:
            if status_map.get(zone, "open") == "closed":
                is_blocked = True
                break
                
            density = density_map.get(zone, 50)
            total_weight += density
            if density > 80:
                has_high_density = True
                
        if not is_blocked:
            evaluated_routes.append({
                "path": path,
                "total_congestion": total_weight,
                "has_high_density": has_high_density
            })
        
    if not evaluated_routes:
        return [{"path": [], "total_congestion": 0, "reason": "All paths blocked"}]
        
    safe_routes = [r for r in evaluated_routes if not r["has_high_density"]]
    
    if safe_routes:
        best_route = min(safe_routes, key=lambda r: r["total_congestion"])
        reason = "Avoided high density zones"
    else:
        best_route = min(evaluated_routes, key=lambda r: r["total_congestion"])
        reason = "Selected lowest overall congestion"

    return [
        {
            "path": best_route["path"],
            "total_congestion": best_route["total_congestion"],
            "reason": reason
        }
    ]

def get_personalized_route(start: str, end: str, user_type: str):
    crowd_data = get_crowd_data()
    density_map = {item["zone"]: item["density"] for item in crowd_data}
    status_map = {item["zone"]: item["status"] for item in crowd_data}
    
    # Generate some logical traversal paths bridging start to end
    raw_paths = [
        [start, end],
        [start, "C3", end],
        [start, "B2", end],
        [start, "B2", "C3", end]
    ]
    
    # Deduplicate steps
    cleaned_paths = []
    for p in raw_paths:
        cleaned = []
        for step in p:
            if not cleaned or cleaned[-1] != step:
                if step not in cleaned:
                    cleaned.append(step)
        if len(cleaned) > 1 and cleaned not in cleaned_paths:
            cleaned_paths.append(cleaned)

    evaluated_routes = []
    for path in cleaned_paths:
        total_weight = 0
        is_blocked = False
        
        for zone in path:
            if status_map.get(zone, "open") == "closed":
                is_blocked = True
                break
                
            density = density_map.get(zone, 50)
            base_cost = density
            
            if user_type == "fast_exit":
                # Heavily penalize any congestion to force the fastest literal exit
                base_cost += (density ** 2) / 100
            elif user_type == "food_lover":
                # Reward paths touching central hubs B2/C3 (stalls)
                if zone in ["B2", "C3"]:
                    base_cost -= 30
            elif user_type == "explorer":
                # Enjoy longer routes, moderate congestion penalty
                base_cost = density * 0.5 - len(path) * 5
                
            total_weight += base_cost
            
        if not is_blocked:
            evaluated_routes.append({
                "path": path,
                "total_congestion": round(total_weight, 2),
            })
            
    if not evaluated_routes:
        return {"path": [], "total_congestion": 0, "reason": "All paths blocked"}

    best_route = min(evaluated_routes, key=lambda r: r["total_congestion"])
    
    reasons = {
        "fast_exit": "Prioritized physically clearest trajectory.",
        "food_lover": "Routed near prime food concourses.",
        "explorer": "Balanced crowd safety with maximum stadium coverage."
    }
    
    return {
        "path": best_route["path"],
        "total_congestion": int(best_route["total_congestion"]),
        "reason": reasons.get(user_type, "Standard optimization applied.")
    }

