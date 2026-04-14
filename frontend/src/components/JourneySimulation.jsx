import React, { useState, useEffect } from 'react';

export default function JourneySimulation({ routes, queues, alerts }) {
    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
        else setStep(0);
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <div className="journey-card fade-in">
                        <h3>🧍‍♂️ User idle</h3>
                        <p>Click "Start Simulation" to track a user's experience.</p>
                    </div>
                );
            case 1:
                return (
                    <div className="journey-card fade-in" style={{ borderColor: '#38bdf8' }}>
                        <h3>🎟️ Step 1: Entering Stadium</h3>
                        <p>User scans ticket at main gate. Profile loaded.</p>
                    </div>
                );
            case 2: {
                const route = routes && routes.length > 0 ? routes[0] : null;
                return (
                    <div className="journey-card fade-in" style={{ borderColor: '#818cf8' }}>
                        <h3>🧭 Step 2: Route Suggestion</h3>
                        <p>System calculates optimal path to their seat.</p>
                        {route ? (
                            <div className="simulation-highlight">
                                <strong>Path:</strong> {route.path?.join(' ➔ ')}<br/>
                                <em>Why? {route.reason}</em>
                            </div>
                        ) : (
                            <p>No safe routes available currently.</p>
                        )}
                    </div>
                );
            }
            case 3: {
                const bestQueue = queues?.find(q => q.recommended);
                return (
                    <div className="journey-card fade-in" style={{ borderColor: '#22c55e' }}>
                        <h3>🍔 Step 3: Queue Recommendation</h3>
                        <p>User wants food before the event starts. App directs them to the fastest stall.</p>
                        {bestQueue ? (
                            <div className="simulation-highlight" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
                                <strong>Go to: {bestQueue.stall}</strong><br/>
                                Wait time is only {bestQueue.wait_time} minutes.
                            </div>
                        ) : (
                            <p>Calculating queue times...</p>
                        )}
                    </div>
                );
            }
            case 4: {
                const sampleAlert = alerts && alerts.length > 0 ? alerts[0] : null;
                return (
                    <div className="journey-card fade-in" style={{ borderColor: '#ef4444' }}>
                        <h3>📲 Step 4: Live Alerts</h3>
                        <p>Push notification sent to user based on real-time data.</p>
                        {sampleAlert ? (
                            <div className="simulation-highlight" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5' }}>
                                {sampleAlert.type === 'warning' ? '⚠️' : '💡'} {sampleAlert.message}
                            </div>
                        ) : (
                            <p>No active alerts. Have a great time!</p>
                        )}
                    </div>
                );
            }
            default:
                return null;
        }
    };

    return (
        <div className="component-panel journey-panel" style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ marginBottom: 0 }}>User Journey Simulation</h2>
                <button 
                    onClick={nextStep}
                    style={{
                        background: '#818cf8',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                    }}
                >
                    {step === 0 ? 'Start Simulation' : step < 4 ? 'Next Step ➔' : 'Restart'}
                </button>
            </div>
            
            <div className="journey-progress">
                <div className={`progress-dot ${step >= 1 ? 'active' : ''}`} />
                <div className={`progress-line ${step >= 2 ? 'active' : ''}`} />
                <div className={`progress-dot ${step >= 2 ? 'active' : ''}`} />
                <div className={`progress-line ${step >= 3 ? 'active' : ''}`} />
                <div className={`progress-dot ${step >= 3 ? 'active' : ''}`} />
                <div className={`progress-line ${step >= 4 ? 'active' : ''}`} />
                <div className={`progress-dot ${step >= 4 ? 'active' : ''}`} />
            </div>

            <div style={{ minHeight: '150px', marginTop: '1rem' }}>
                {renderStepContent()}
            </div>
        </div>
    );
}
