import React from 'react';

const MAX_VISIBLE   = 5;
const CARD_HEIGHT   = 76;  // px — consistent height target per card
const CARD_GAP      = 10;  // px — matches gap: 0.6rem ≈ 9.6px

export default function AlertsPanel({ alerts }) {
    const visible     = alerts?.slice(-MAX_VISIBLE) ?? [];
    const needsScroll = (alerts?.length ?? 0) > MAX_VISIBLE;

    // Exact height for ≤5: sum of cards + gaps (no dead space)
    // Locked height for >5: cap at 5 cards + gaps
    const containerMaxHeight =
        needsScroll
            ? MAX_VISIBLE * CARD_HEIGHT + (MAX_VISIBLE - 1) * CARD_GAP
            : visible.length * CARD_HEIGHT + Math.max(0, visible.length - 1) * CARD_GAP;

    const getAlertStyle = (type) => {
        if (type === 'critical') return { bg: 'rgba(239,68,68,0.15)', border: '#ef4444', color: '#fca5a5', icon: '🚨' };
        if (type === 'warning')  return { bg: 'rgba(249,115,22,0.15)', border: '#f97316', color: '#fdba74', icon: '⚠️' };
        return                         { bg: 'rgba(56,189,248,0.15)',  border: '#38bdf8', color: '#bae6fd', icon: '💡' };
    };

    return (
        <div className="component-panel alerts-panel">
            <h2>System Alerts</h2>
            <div
                className={`alerts-container ${needsScroll ? 'alerts-fade-bottom' : ''}`}
            >
                {visible.length === 0 && <p style={{ color: '#94a3b8' }}>All clear — no active alerts.</p>}
                {visible.map((alert, i) => {
                    const style = getAlertStyle(alert.type);
                    return (
                        <div
                            key={`${alert.message}-${i}`}
                            className="alert-card fade-in"
                            style={{
                                background: style.bg,
                                borderLeft: `4px solid ${style.border}`,
                                color: style.color,
                                minHeight: `${CARD_HEIGHT}px`
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                                <span>{style.icon} {alert.message}</span>
                                {alert.timestamp && (
                                    <span style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap' }}>{alert.timestamp}</span>
                                )}
                            </div>
                            {alert.action && (
                                <div style={{ marginTop: '0.35rem', fontSize: '0.8rem', opacity: 0.85 }}>
                                    👉 {alert.action}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
