import random

STALLS = ["Pizza", "Burgers", "Hotdogs", "Drinks", "Merchandise"]

def get_queue_status():
    queues = []
    for stall in STALLS:
        wait_time = random.randint(1, 20)
        status = "fast" if wait_time <= 5 else "moderate" if wait_time <= 10 else "slow"
        queues.append({
            "stall": stall,
            "wait_time": wait_time,
            "status": status,
            "recommended": False
        })
        
    # Recommendation logic:
    if queues:
        # Find the stall with minimum wait time
        best_queue = min(queues, key=lambda q: q["wait_time"])
        best_queue["recommended"] = True
        
    return queues
