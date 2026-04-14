# Smart Stadium Backend

This is the FastAPI backend for the Smart Stadium Crowd Management System.

## Environment Setup

Follow these instructions to set up your Python environment and run the server locally.

### 1. Requirements

The backend requires packages `fastapi`, `uvicorn`, and `python-multipart` as outlined in `requirements.txt`.

### 2. Activate Virtual Environment (Windows)

A virtual environment named `venv` has been securely initialized inside the `backend` folder. Open PowerShell in the `backend` directory and run:

```powershell
.\venv\Scripts\activate
```

*(Note: If you run into script execution errors in PowerShell, you may need to run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` to allow the activation script to run.)*

### 3. Install Dependencies

Once the virtual environment is activated, install all required dependencies:

```powershell
pip install -r requirements.txt
```

### 4. Run the Server

Start the FastAPI application using Uvicorn:

```powershell
uvicorn app.main:app --reload
```

The API will launch on `http://127.0.0.1:8000`. Access interactive documentation at `http://127.0.0.1:8000/docs`.

---

## 🛠️ API Services

### 📊 Crowd Service
Manages real-time zone data, capacity tracking, and congestion levels. It calculates density trends (increasing/decreasing) based on simulated person-counts.

### 🧭 Routing Service
Implements a Dijkstra-based pathfinding engine. It calculates weighted paths by considering:
- Real-time zone congestion.
- Active zone closures (set by admin).
- Person-specific preferences (e.g., fast exit, food search).

### 🍔 Queue Service
Monitors wait-times for service points and provides smart "fastest stall" recommendations to the frontend.

### 🚨 Alert Service
Aggregates system-wide data to generate priority-based notifications (Critical, Warning, Suggestion).

### 🎛️ Simulation Engine
Automates crowd movement and allows manual "What-If" overrides. The `/api/admin/simulate-spike` endpoint allows testers to manually trigger congestion in any zone to observe system adaptation.

---

### CORS Configuration
The application is pre-configured to communicate with Vite-based frontends (`localhost:5173`) via `CORSMiddleware` in `app/main.py`.
