import React, { useState } from 'react';
import { BASE_URL } from '../config';

export default function AdminPanel({ crowdData, refreshData }) {
    const [loading, setLoading] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const toggleStatus = async (zone, currentStatus) => {
        setLoading(zone);
        const newStatus = currentStatus === 'open' ? 'closed' : 'open';
        
        try {
            await fetch(`${BASE_URL}/api/admin/toggle-zone`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zone, status: newStatus })
            });
            refreshData(); // Instant sync
            showToast(`Zone ${zone} has been ${newStatus} successfully`);
        } catch (error) {
            console.error("Failed to toggle zone", error);
            showToast(`Failed to toggle zone ${zone}`);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="component-panel" style={{ position: 'relative' }}>
            <h2>Admin Controls</h2>
            
            {toast && (
                <div className="toast-notification fade-in">
                    {toast}
                </div>
            )}
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {crowdData?.map((item) => {
                    const isClosed = item.status === 'closed';
                    const isLoading = loading === item.zone;
                    
                    return (
                        <li 
                            key={item.zone} 
                            className={`admin-zone-card ${isClosed ? 'closed' : ''} ${isLoading ? 'toggling-glow' : ''}`}
                        >
                            <div>
                                <strong>Zone {item.zone}</strong> 
                                <span className={`status-label ${isClosed ? 'closed-text' : 'open-text'}`}>
                                    {isClosed ? 'CLOSED' : 'OPEN'}
                                </span>
                            </div>
                            <button 
                                onClick={() => toggleStatus(item.zone, item.status)}
                                disabled={isLoading}
                                className={`admin-btn ${isClosed ? 'btn-open' : 'btn-close'}`}
                            >
                                {isLoading ? '...' : isClosed ? 'Open' : 'Close'}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}
