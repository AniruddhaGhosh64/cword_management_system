import React from 'react';

export default function InsightsPanel({ insights }) {
    if (!insights) return null;

    return (
        <div className="component-panel">
            <h2>Stadium Analytics</h2>
            
            <div className="insights-grid">
                <div className="insight-card fade-in">
                    <span className="insight-icon">🔥</span>
                    <div className="insight-content">
                        <small>Most Crowded</small>
                        <strong>Zone {insights.most_crowded}</strong>
                    </div>
                </div>
                <div className="insight-card fade-in">
                    <span className="insight-icon">❄️</span>
                    <div className="insight-content">
                        <small>Least Crowded</small>
                        <strong>Zone {insights.least_crowded}</strong>
                    </div>
                </div>
                <div className="insight-card fade-in">
                    <span className="insight-icon">⏱️</span>
                    <div className="insight-content">
                        <small>Avg. Food Wait</small>
                        <strong>{insights.avg_wait} mins</strong>
                    </div>
                </div>
                <div className="insight-card fade-in">
                    <span className="insight-icon">📈</span>
                    <div className="insight-content">
                        <small>Peak Pending</small>
                        <strong>Zone {insights.peak_zone}</strong>
                    </div>
                </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '2rem' }}>
                ⚡ Real-time processing active
            </p>
        </div>
    );
}
