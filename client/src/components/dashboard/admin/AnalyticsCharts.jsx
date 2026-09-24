import React from 'react';
import { BarChart3, TrendingUp, Users, Flame, Award, Database } from 'lucide-react';
import { MOCK_ANALYTICS } from '../../../api/adminApi';

export const AnalyticsCharts = ({ analytics = MOCK_ANALYTICS }) => {
  const { hiringFunnel, topSkillsDemand, recruiterLeaderboard } = analytics;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header with Aggregation Note */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderLeft: '4px solid var(--accent-emerald)',
        }}
      >
        <Database size={22} color="var(--accent-emerald)" />
        <div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>
            MongoDB Real-Time Aggregation Feeds
          </span>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            These widgets demonstrate multi-stage MongoDB aggregations: <code>$unwind</code> on skills, <code>$group</code> on funnel stages, and <code>$subtract</code> on date diffs.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Pipeline 1: Hiring Funnel */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <TrendingUp size={18} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Hiring Funnel Stage Conversion</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {hiringFunnel.map((stage, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{stage.stage}</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {stage.count} candidates ({stage.percentage}%)
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${stage.percentage}%`,
                      height: '100%',
                      background: 'var(--gradient-brand)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline 2: Skill Demand Heatmap */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <Flame size={18} color="var(--accent-rose)" />
            <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Top 6 In-Demand Skills</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topSkillsDemand.map((item, idx) => {
              const maxCount = topSkillsDemand[0]?.count || 1;
              const fillPct = Math.round((item.count / maxCount) * 100);

              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.skill}</span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                      {item.count} openings
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${fillPct}%`,
                        height: '100%',
                        backgroundColor: 'var(--accent-cyan)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pipeline 3: Recruiter Leaderboard & Time to Hire */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Award size={18} color="var(--accent-amber)" />
          <h3 style={{ fontSize: '1.05rem', margin: 0 }}>
            Recruiter Performance & Time-to-Hire Leaderboard
          </h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '10px' }}>Recruiting Company</th>
              <th style={{ padding: '10px' }}>Active Openings</th>
              <th style={{ padding: '10px' }}>Hires Closed</th>
              <th style={{ padding: '10px' }}>Avg Time to Fill</th>
            </tr>
          </thead>
          <tbody>
            {recruiterLeaderboard.map((rec, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 10px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {rec.name}
                </td>
                <td style={{ padding: '12px 10px' }}>{rec.jobsPosted} jobs</td>
                <td style={{ padding: '12px 10px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  {rec.hires} hires
                </td>
                <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>
                  {rec.avgDaysToFill} days
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
