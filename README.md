# 🏟️ Smart Stadium – Crowd Management System

## 🚨 Problem
Large-scale stadiums face:
- **Overcrowded zones**: Leading to safety risks and discomfort.
- **Long food queues**: Damaging the fan experience.
- **Inefficient navigation**: Difficulty in finding exits or specific stalls.
- **Poor real-time coordination**: Lack of a centralized monitoring and intervention system.

## 💡 Solution
**Smart Stadium** is a real-time crowd intelligence system designed to optimize stadium operations and attendee safety. It:
- Monitors live crowd density across all zones.
- Predicts congestion trends using simulation models.
- Suggests optimal routes via an adaptive routing engine.
- Recommends the fastest service points/food stalls.
- Enables administrative intervention to manage zone status dynamically.

---

## ⚙️ Features

### 📊 Live Crowd Heatmap
- **Real-time density tracking**: Visual representation of crowd distribution.
- **Congestion levels**: Color-coded tiers (Low 🟢 / Medium 🟡 / High 🔴).
- **Trend prediction**: Indicator for increasing (↑) or decreasing (↓) density.

### 🧭 Smart Navigation
- **Adaptive Routing**: Paths dynamically update as congestion shifts.
- **Obstacle Avoidance**: Automatically routes around closed zones or critical congestion.
- **Optimized Paths**: Provides the most efficient route between any two points.

### 🍔 Queue Intelligence
- **Live Wait Times**: Real-time status of service points.
- **Recommendations**: Smart hints for the "Fastest stall nearby."

### 🚨 System Alerts
- **Priority-aware Notifications**: Categorized into *Critical*, *Warning*, and *Suggestion*.
- **Actionable Hints**: Tells you exactly what to do (e.g., "Use Zone D4 instead").

### 🎛️ Admin Controls
- **Zone Management**: Open or close segments of the stadium instantly.
- **Responsive Logic**: Closing a zone triggers automatic system-wide rerouting and alerts.

### ⚡ What-If Simulation
- **Manual Spikes**: Simulate congestion spikes in specific zones.
- **System Stress Test**: Observe how the system adapts and reroutes in real-time.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite) with a custom Glassmorphism UI.
- **Backend**: FastAPI (Python) for simulation and routing services.
- **Styling**: Vanilla CSS (Custom variables, animations).
- **Deployment**: Google Cloud Run (Optimized for scale).

---

## 🔄 How It Works

1. **Data Ingestion**: Simulated sensor data updates crowd stats dynamically.
2. **Back-end Processing**: The FastAPI engine calculates congestion tiers and density trends.
3. **Routing Engine**: Dijkstra-based paths are calculated, weighted by real-time congestion and zone status.
4. **Front-end Sync**: The React dashboard polls the API to update UI components in real-time.
5. **Admin Feedback**: Actions taken in the Admin Panel immediately invalidate paths and trigger new system-wide routes.

---

## 🎬 Demo Flow

1. **Dashboard Overview**: Scan the Heatmap for live status.
2. **Navigation Test**: Set a start/end point and observe the recommended path.
3. **Admin Intervention**: Close a zone on the path and watch the navigation update instantly.
4. **Queue Check**: View fluctuating wait times and follow stall suggestions.
5. **Scenario Stress**: Use the "What-If" panel to spike a zone and trigger "CRITICAL" system alerts.

---

## 🚀 Future Scope

- **Real Hardware Integration**: Connect with IoT sensors, thermal cameras, and turnstile data.
- **Mobile Companion App**: Personalized navigation and queue-jumping features for fans.
- **ML Predictive Modeling**: Train AI models on historical gate entry/exit data.
- **Map APIs**: Integrate with Google Maps or Mapbox for large-scale outdoor events.

---

## 👥 Use Cases

- **Sports Stadiums**: Optimized match-day operations.
- **Concert Venues**: Enhanced safety for high-energy events.
- **Festivals**: Dynamic stage-to-stage guidance.
- **Smart Cities**: General crowd control in public squares or transit hubs.

---

## 🧠 Key Idea

Instead of static planning, this system **adapts dynamically** to real-time crowd behavior, transforming stadium management into a proactive, data-driven science.
