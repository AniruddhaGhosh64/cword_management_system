# 🏟️ Smart Stadium – Crowd Management System

## 🚨 Problem

Large-scale sporting venues face critical operational challenges:

- **Overcrowded zones** → Safety risks and poor attendee experience  
- **Long queues at food stalls** → Reduced engagement and satisfaction  
- **Inefficient navigation** → Difficulty locating exits, seats, or services  
- **Lack of real-time coordination** → Delayed response to dynamic situations  

---

## 💡 Solution

**Smart Stadium** is a real-time crowd intelligence system that transforms how large venues operate.

It provides:

- 📊 Live monitoring of crowd density across all zones  
- 🔮 Predictive insights to anticipate congestion trends  
- 🧭 Adaptive routing for efficient navigation  
- 🍔 Smart queue recommendations for faster service  
- 🎛️ Admin-level control for real-time intervention  

> 👉 This is not just a dashboard — it's a **decision-support system for crowd optimization**.

---

## ⚙️ Features

### 📊 Live Crowd Heatmap
- Real-time crowd density visualization  
- Color-coded congestion levels:  
  - 🟢 Low (0–40%)  
  - 🟡 Medium (41–70%)  
  - 🔴 High (71–100%)  
- Trend indicators:
  - ↑ Increasing  
  - ↓ Decreasing  

---

### 🧭 Smart Navigation
- **Adaptive Routing** → Updates dynamically based on live congestion  
- **Obstacle Avoidance** → Automatically bypasses closed or high-density zones  
- **Optimized Paths** → Minimizes travel time and crowd exposure  

---

### 🍔 Queue Intelligence
- Real-time wait times across food stalls  
- Categorization:
  - Fast / Moderate / Slow  
- Smart recommendations:
  - “Fastest stall nearby”  

---

### 🚨 System Alerts
- Priority-based notifications:
  - 🔴 Critical  
  - 🟡 Warning  
  - 🔵 Suggestion  
- Context-aware guidance:
  - “Avoid Zone B”  
  - “Use Zone D4 instead”  

---

### 🎛️ Admin Controls
- Open/close zones in real time  
- Immediate system-wide impact:
  - Route recalculation  
  - Alert generation  
- Centralized operational control  

---

### ⚡ What-If Simulation
- Inject artificial congestion spikes  
- Stress-test system behavior  
- Observe:
  - Dynamic rerouting  
  - Alert escalation  
  - System adaptability  

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React (Vite)  
- Custom CSS (Grid + Flex layout)  
- Real-time polling (~3s interval)  
- Dark/Light theme (Google-inspired UI)  

### 🔹 Backend
- FastAPI (Python)  
- Modular architecture:
  - `/api/crowd`
  - `/api/routing`
  - `/api/queues`
  - `/api/alerts`
  - `/api/admin`
  - `/api/insights`

### 🔹 Deployment
- Google Cloud Run  
- Docker:
  - Python container (backend)
  - Multi-stage Node + Nginx (frontend)  
- Google Container Registry (gcr.io)  

---

## 🔄 How It Works

1. **Data Simulation Layer**  
   - Generates dynamic crowd flow across zones  
   - Simulates real-world fluctuations and movement  

2. **Processing Engine (FastAPI)**  
   - Calculates density, congestion levels, and trends  
   - Evaluates queue conditions  

3. **Routing Engine**  
   - Uses weighted graph logic (Dijkstra-based)  
   - Prioritizes low-density paths  
   - Avoids blocked or high-risk zones  

4. **Real-Time Sync (Frontend)**  
   - Polls backend APIs every few seconds  
   - Updates UI seamlessly without reloads  

5. **Admin Feedback Loop**  
   - Zone changes trigger:
     - Route recalculation  
     - Alert updates  
     - System-wide adaptation  

---

## 🎬 Demo Flow

1. **Dashboard Overview**  
   - Observe live crowd distribution via heatmap  

2. **Navigation Test**  
   - Select start & end zones  
   - View optimized path  

3. **Admin Intervention**  
   - Close a zone  
   - Watch routing update instantly  

4. **Queue Optimization**  
   - Compare wait times  
   - Follow system recommendations  

5. **Scenario Simulation**  
   - Trigger congestion spike  
   - Observe alerts + adaptive rerouting  

---

## 🌐 Live Demo

- 🔗 Frontend: [https://your-frontend-url](https://stadium-frontend-910282726941.asia-south1.run.app/)
- 🔗 Backend API Docs: [https://your-backend-url/docs](https://stadium-backend-910282726941.asia-south1.run.app/docs)

## 🚀 Future Scope

- 🔌 Integration with real-world sensors (IoT, CCTV, entry gates)  
- 📱 Mobile companion app for attendees  
- 🤖 ML-based predictive modeling using historical data  
- 🗺️ Integration with Map APIs (Google Maps / Mapbox)  
- 🏙️ Expansion to smart cities & public infrastructure  

---

## 👥 Use Cases

- 🏟️ Sports stadiums → Match-day optimization  
- 🎵 Concert venues → Crowd safety & flow control  
- 🎪 Festivals → Stage-to-stage navigation  
- 🏙️ Smart cities → Public crowd management  

---

## 🧠 Key Idea

> Instead of static planning, this system **adapts dynamically to real-time human movement**, transforming crowd management into a proactive, data-driven system.
