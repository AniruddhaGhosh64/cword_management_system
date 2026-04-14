import React, { useState } from 'react';
import { BASE_URL } from '../config';

const ZONES = ['A1', 'B2', 'C3', 'D4'];

export default function WhatIfSimulation({ crowdData, refreshData }) {
    const [selectedZone, setSelectedZone] = useState(ZONES[0]);
    const [density, setDensity] = useState(90);
    const [activeSpikes, setActiveSpikes] = useState({});
    const [loading, setLoading] = useState(false);

    const applySpike = async () => {
        setLoading(true);
        try {
            await fetch(`${BASE_URL}/api/admin/simulate-spike`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zone: selectedZone, density })
            });
            setActiveSpikes(prev => ({ ...prev, [selectedZone]: density }));
            refreshData();
        } finally {
            setLoading(false);
        }
    };

    const resetSpike = async (zone) => {
        await fetch(`${BASE_URL}/api/admin/reset-spike`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ zone, status: 'open' })
        });
        setActiveSpikes(prev => {
            const next = { ...prev };
            delete next[zone];
            return next;
        });
        refreshData();
    };

    const resetAll = async () => {
        await fetch(`${BASE_URL}/api/admin/reset-all-spikes`, { method: 'POST' });
        setActiveSpikes({});
        refreshData();
    };

    const getDensityColor = (d) => {
        if (d >= 80) return '#ef4444';
        if (d >= 50) return '#f59e0b';
        return '#22c55e';
    };

    return (
        <div className="component-panel whatif-panel" style={{ gridColumn: '1 / -1' }}>
            <div className="whatif-header">
                <div>
                    <h2 style={{ marginBottom: '0.25rem' }}>⚡ What-If Simulation</h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                        Simulate a congestion spike to test system adaptability in real-time
                    </p>
                </div>
                {Object.keys(activeSpikes).length > 0 && (
                    <button className="whatif-btn-reset-all" onClick={resetAll}>
                        🔄 Reset All Simulations
                    </button>
                )}
            </div>

            <div className="whatif-controls">
                {/* Zone selector */}
                <div className="whatif-field">
                    <label>Select Zone</label>
                    <div className="whatif-zone-grid">
                        {ZONES.map(z => (
                            <button
                                key={z}
                                onClick={() => setSelectedZone(z)}
                                className={`whatif-zone-btn ${selectedZone === z ? 'active' : ''} ${activeSpikes[z] ? 'spiked' : ''}`}
                            >
                                {z}
                                {activeSpikes[z] && <span className="spike-badge">🔥 {activeSpikes[z]}%</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Density slider */}
                <div className="whatif-field">
                    <label>
                        Target Density:{' '}
                        <strong style={{ color: getDensityColor(density) }}>{density}%</strong>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={density}
                        onChange={e => setDensity(Number(e.target.value))}
                        className="whatif-slider"
                        style={{ '--thumb-color': getDensityColor(density) }}
                    />
                    <div className="whatif-slider-labels">
                        <span style={{ color: '#22c55e' }}>0% Empty</span>
                        <span style={{ color: '#f59e0b' }}>50% Medium</span>
                        <span style={{ color: '#ef4444' }}>100% Critical</span>
                    </div>
                </div>

                {/* Apply button */}
                <div className="whatif-field whatif-action">
                    <button
                        className="whatif-btn-apply"
                        onClick={applySpike}
                        disabled={loading}
                        style={{ borderColor: getDensityColor(density), color: getDensityColor(density) }}
                    >
                        {loading ? '⏳ Applying...' : `🚨 Simulate Congestion Spike on Zone ${selectedZone}`}
                    </button>
                </div>
            </div>

            {/* Active spikes live display */}
            {Object.keys(activeSpikes).length > 0 && (
                <div className="whatif-active-spikes fade-in">
                    <p style={{ color: '#f59e0b', fontWeight: 'bold', marginBottom: '0.5rem' }}>🧪 Active Simulations</p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {Object.entries(activeSpikes).map(([z, d]) => (
                            <div key={z} className="spike-chip">
                                <span>Zone {z} → <strong style={{ color: getDensityColor(d) }}>{d}%</strong></span>
                                <button onClick={() => resetSpike(z)} className="spike-chip-reset">✕</button>
                            </div>
                        ))}
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                        Heatmap, routing, and alerts are reacting to the simulated values above.
                    </p>
                </div>
            )}
        </div>
    );
}
