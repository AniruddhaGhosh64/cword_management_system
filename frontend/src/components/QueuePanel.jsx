import React from 'react';

export default function QueuePanel({ queues }) {
    const getStatusColor = (status) => {
        if (status === 'slow') return '#ef4444';
        if (status === 'moderate') return '#f59e0b';
        return '#22c55e';
    };

    return (
        <div className="component-panel">
            <h2>Food Queue Status</h2>
            <ul>
                {queues?.map((queue, i) => (
                    <li key={queue.stall || i} style={{ borderColor: getStatusColor(queue.status) }}>
                        <strong>{queue.stall}</strong> 
                        {queue.recommended && <span style={{ marginLeft: '10px', fontSize: '0.8rem', background: '#22c55e', padding: '2px 6px', borderRadius: '4px', color: '#fff' }}>Recommended ✨</span>}
                        <br/>
                        <span style={{ fontSize: '1.2rem', color: '#f8fafc' }}>{queue.wait_time} mins wait</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
