import React, { useRef } from 'react';

export default function RouteDisplay({ routes }) {
    const prevPathRef = useRef(null);

    const route = routes?.[0];
    const currentPath = route?.path?.join(',') ?? '';
    const isRerouted = prevPathRef.current !== null && prevPathRef.current !== currentPath;

    if (route) prevPathRef.current = currentPath;

    const estimatedTimeSaved = route ? Math.max(1, Math.floor((100 - route.total_congestion / (route.path?.length || 1)) / 12)) : 0;

    return (
        <div className="component-panel">
            <h2>Smart Navigation</h2>
            
            {route ? (
                <div className={`route-card ${isRerouted ? 'reroute-flash' : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span className="route-badge">✅ Optimized Route</span>
                        {isRerouted && (
                            <span className="reroute-notice fade-in">⚡ Updated</span>
                        )}
                    </div>

                    <div className="route-path" style={{ margin: '1.5rem 0' }}>
                        {route.path?.map((zone, i) => (
                            <React.Fragment key={zone}>
                                <span className="route-node">{zone}</span>
                                {i < route.path.length - 1 && <span className="route-arrow">→</span>}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="route-meta">
                        <div className="route-meta-item">
                            <span>📊</span>
                            <div>
                                <small>Congestion</small>
                                <strong>{route.total_congestion}</strong>
                            </div>
                        </div>
                        <div className="route-meta-item">
                            <span>⏱️</span>
                            <div>
                                <small>Est. Saved</small>
                                <strong>~{estimatedTimeSaved}m</strong>
                            </div>
                        </div>
                    </div>

                    <p className="route-reason" style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                        💡 {route.reason}
                    </p>
                </div>
            ) : (
                <div style={{ padding: '2rem 0' }}>
                    <p style={{ color: '#94a3b8', textAlign: 'center' }}>No route available. Path may be blocked.</p>
                </div>
            )}

            {!route && (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: 'auto' }}>
                    Please check Admin Controls for zone status.
                </p>
            )}
        </div>
    );
}
