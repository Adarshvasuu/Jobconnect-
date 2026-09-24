import React from 'react';
import { Database, Activity, Cpu, Server } from 'lucide-react';

export const PlatformHealthWidgets = () => {
  const healthStats = [
    { title: 'MongoDB Engine', value: 'Cluster Healthy', sub: 'Mongoose 8.x • ReplicaSet', icon: Database, color: 'var(--accent-emerald)' },
    { title: 'Pipeline Latency', value: '14ms avg', sub: 'p95 aggregation execution', icon: Activity, color: 'var(--accent-cyan)' },
    { title: 'Server Runtime', value: '99.98% Uptime', sub: 'Node.js Express Cluster', icon: Server, color: 'var(--accent-primary)' },
    { title: 'MERN Compliance', value: '100% Strict', sub: 'Zero non-MERN dependencies', icon: Cpu, color: 'var(--accent-secondary)' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      {healthStats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${stat.color}40`,
                color: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.title}</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.72rem', color: stat.color }}>{stat.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlatformHealthWidgets;
