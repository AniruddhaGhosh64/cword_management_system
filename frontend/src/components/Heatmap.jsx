import React from 'react';

export default function Heatmap({ crowdData }) {
    const getIcon = (congestion) => {
        if (congestion === 'none') return '⚪';
        if (congestion === 'high') return '🔴';
        if (congestion === 'medium') return '🟡';
        return '🟢';
    };

    const getTrendArrow = (trend) => {
        if (trend === 'increasing') return <span style={{ color: '#ef4444', fontWeight: 'bold' }}>↑</span>;
        if (trend === 'decreasing') return <span style={{ color: '#22c55e', fontWeight: 'bold' }}>↓</span>;
        return <span style={{ color: '#94a3b8' }}>→</span>;
    };

    const getZoneClass = (item, isClosed) => {
        if (isClosed) return 'zone-item zone-closed';
        if (item.congestion === 'high') return 'zone-item zone-high pulse-high';
        if (item.congestion === 'medium') return 'zone-item zone-medium glow-medium';
        return 'zone-item zone-low';
    };

    return (
        <div className="component-panel">
            <h2>Live Crowd Heatmap</h2>
            
            <ul style={{ padding: 0, margin: '1.5rem 0' }}>
                {crowdData?.map(item => {
                    const isClosed = item.status === 'closed';
                    return (
                        <li
                            key={item.zone}
                            className={getZoneClass(item, isClosed)}
                            title={`Current People: ${item.current} / Capacity: ${item.capacity}`}
                            style={{ pointerEvents: isClosed ? 'none' : 'auto', marginBottom: '0.75rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <strong>Zone {item.zone}</strong>{' '}
                                    {isClosed
                                        ? <span className="zone-closed-label">Closed</span>
                                        : <>{getIcon(item.congestion)} {getTrendArrow(item.trend)}</>
                                    }
                                </div>
                                {!isClosed && (
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.density}%</div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                            pred: {item.predicted_density}%
                                        </div>
                                    </div>
                                )}
                            </div>
                            {!isClosed && (
                                <div className="density-bar-wrap">
                                    <div
                                        className="density-bar"
                                        style={{
                                            width: `${item.density}%`,
                                            background: item.congestion === 'high' ? '#ef4444'
                                                      : item.congestion === 'medium' ? '#f59e0b'
                                                      : '#22c55e'
                                        }}
                                    />
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <span>🔴 High</span>
                <span>🟡 Medium</span>
                <span>🟢 Low</span>
                <span>🔘 Closed</span>
            </div>
        </div>
    );
}
