import React, { useState, useEffect, useLayoutEffect } from 'react';
import Heatmap from './components/Heatmap';
import RouteDisplay from './components/RouteDisplay';
import QueuePanel from './components/QueuePanel';
import AlertsPanel from './components/AlertsPanel';
import AdminPanel from './components/AdminPanel';
import JourneySimulation from './components/JourneySimulation';
import InsightsPanel from './components/InsightsPanel';
import WhatIfSimulation from './components/WhatIfSimulation';
import ThemeToggle from './components/ThemeToggle';
import { BASE_URL } from './config';
import './App.css';

function App() {
  // Apply saved theme before first paint to prevent flash
  useLayoutEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') document.documentElement.classList.add('light');
  }, []);

  const [status, setStatus] = useState("Checking API...");
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [timeAgo, setTimeAgo] = useState(0);
  
  const [crowdData, setCrowdData] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [queues, setQueues] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [insights, setInsights] = useState(null);

  const fetchData = async () => {
    try {
      const [statusRes, crowdRes, routeRes, queueRes, alertsRes, insightsRes] = await Promise.all([
        fetch(`${BASE_URL}/`),
        fetch(`${BASE_URL}/api/crowd/`),
        fetch(`${BASE_URL}/api/routing/`),
        fetch(`${BASE_URL}/api/queues/`),
        fetch(`${BASE_URL}/api/alerts/`),
        fetch(`${BASE_URL}/api/insights/`)
      ]);
      
      const st = await statusRes.json();
      setStatus(st.message || "API Running");
      
      setCrowdData(await crowdRes.json());
      setRoutes(await routeRes.json());
      setQueues(await queueRes.json());
      setAlerts(await alertsRes.json());
      setInsights(await insightsRes.json());
      setLastUpdated(Date.now());
    } catch (err) {
      setStatus("API is unreachable");
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeAgo(Math.floor((Date.now() - lastUpdated) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastUpdated]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Smart Stadium</h1>
        <h2>Crowd Management System</h2>
        <p className="status" style={{ marginBottom: '10px' }}>
          Backend Status: <span style={{ color: status.includes("unreachable") ? "#ef4444" : "#22c55e" }}>{status}</span>
        </p>
        <p className="status" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className="live-indicator"></span> 
          <span>Live • Last updated: {timeAgo} seconds ago</span>
        </p>
      </header>
      
      <main className="dashboard">
        <div className="top-row">
          <InsightsPanel insights={insights} />
          <Heatmap crowdData={crowdData} />
          <RouteDisplay routes={routes} />
        </div>
        
        <div className="bottom-row">
          <QueuePanel queues={queues} />
          <AlertsPanel alerts={alerts} />
          <AdminPanel crowdData={crowdData} refreshData={fetchData} />
          <WhatIfSimulation crowdData={crowdData} refreshData={fetchData} />
          <JourneySimulation routes={routes} queues={queues} alerts={alerts} />
        </div>
      </main>
      <ThemeToggle />
    </div>
  );
}

export default App;
