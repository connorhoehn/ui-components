import { useEffect, useState, useRef } from 'react';
import { SimulatedProvider } from '../../engine/SimulatedProvider';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';
import { pipelineExecutionTimeline } from './simulation';
import {
  mockNodes, mockEdges, nodePalette, nodeTypeIcons, nodeTypeColors,
  type MockNode, type MockEdge,
} from './MockPipeline';
import { PipelineEventLog } from './PipelineEventLog';

type NodeStatus = 'idle' | 'running' | 'completed' | 'failed';

function NodePalette() {
  return (
    <div style={{
      width: 220,
      borderRight: '1px solid #e2e8f0',
      background: '#fff',
      overflow: 'auto',
      padding: '12px 0',
    }}>
      <div style={{ padding: '0 12px 12px' }}>
        <input
          type="text"
          placeholder="Search nodes..."
          style={{
            width: '100%',
            padding: '6px 10px',
            border: '1px solid #e2e8f0',
            borderRadius: 6,
            fontSize: 13,
            outline: 'none',
          }}
        />
      </div>
      {nodePalette.map((group) => (
        <div key={group.category} style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: '#64748b',
            padding: '0 14px',
            marginBottom: 6,
          }}>
            {group.category}
          </div>
          {group.items.map((item) => (
            <div key={item.type} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 14px',
              cursor: 'grab',
              borderRadius: 6,
              margin: '0 6px',
              transition: 'background 0.15s',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f1f5f9'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <span style={{
                fontSize: 16,
                width: 24,
                textAlign: 'center',
                color: nodeTypeColors[item.type],
              }}>
                {nodeTypeIcons[item.type]}
              </span>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#1e293b', flex: 1 }}>
                {item.label}
              </span>
              <span style={{
                fontSize: 11,
                color: '#94a3b8',
                background: '#f1f5f9',
                borderRadius: 4,
                padding: '1px 6px',
                fontWeight: 500,
              }}>
                {item.shortcut}
              </span>
            </div>
          ))}
        </div>
      ))}
      <div style={{ padding: '8px 14px', fontSize: 11, color: '#94a3b8' }}>
        Press 1–8 to insert at center
      </div>
    </div>
  );
}

function PipelineCanvas() {
  const { onMessage } = useWebSocketContext();
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeStatus>>(() => {
    const initial: Record<string, NodeStatus> = {};
    mockNodes.forEach((n) => { initial[n.id] = 'idle'; });
    return initial;
  });

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'pipeline') return;
      const action = msg.action as string;
      const nodeId = msg.nodeId as string | undefined;

      if (action === 'run.started') {
        setNodeStatuses((prev) => {
          const reset: Record<string, NodeStatus> = {};
          Object.keys(prev).forEach((id) => { reset[id] = 'idle'; });
          return reset;
        });
      } else if (action === 'step.started' && nodeId) {
        setNodeStatuses((prev) => ({ ...prev, [nodeId]: 'running' }));
      } else if (action === 'step.completed' && nodeId) {
        setNodeStatuses((prev) => ({ ...prev, [nodeId]: 'completed' }));
      } else if (action === 'step.failed' && nodeId) {
        setNodeStatuses((prev) => ({ ...prev, [nodeId]: 'failed' }));
      }
    });
    return unsubscribe;
  }, [onMessage]);

  const canvasRef = useRef<HTMLDivElement>(null);
  const scale = 0.85;
  const offsetX = 20;
  const offsetY = 20;

  const statusBorderColor: Record<NodeStatus, string> = {
    idle: '#e2e8f0',
    running: '#f59e0b',
    completed: '#10b981',
    failed: '#ef4444',
  };

  const statusGlow: Record<NodeStatus, string> = {
    idle: 'none',
    running: '0 0 12px rgba(245,158,11,0.4)',
    completed: '0 0 8px rgba(16,185,129,0.3)',
    failed: '0 0 8px rgba(239,68,68,0.3)',
  };

  return (
    <div
      ref={canvasRef}
      style={{
        flex: 1,
        background: '#fafbfc',
        backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 500,
      }}
    >
      {/* SVG edges */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {mockEdges.map((edge) => {
          const source = mockNodes.find((n) => n.id === edge.source);
          const target = mockNodes.find((n) => n.id === edge.target);
          if (!source || !target) return null;

          const sx = (source.x + 80) * scale + offsetX;
          const sy = (source.y + 25) * scale + offsetY;
          const tx = target.x * scale + offsetX;
          const ty = (target.y + 25) * scale + offsetY;
          const mx = (sx + tx) / 2;

          const sourceStatus = nodeStatuses[edge.source];
          const edgeColor = sourceStatus === 'completed' ? '#10b981'
            : sourceStatus === 'running' ? '#f59e0b' : '#cbd5e1';

          return (
            <g key={edge.id}>
              <path
                d={`M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ty}, ${tx} ${ty}`}
                fill="none"
                stroke={edgeColor}
                strokeWidth={2}
                style={{ transition: 'stroke 0.3s ease' }}
              />
              {edge.label && (
                <text
                  x={mx}
                  y={(sy + ty) / 2 - 6}
                  textAnchor="middle"
                  style={{ fontSize: 10, fill: '#64748b' }}
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {mockNodes.map((node) => {
        const status = nodeStatuses[node.id] ?? 'idle';
        const color = nodeTypeColors[node.type] ?? '#64748b';
        return (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: node.x * scale + offsetX,
              top: node.y * scale + offsetY,
              width: 160 * scale,
              background: '#fff',
              border: `2px solid ${statusBorderColor[status]}`,
              borderRadius: 8,
              padding: '8px 10px',
              boxShadow: statusGlow[status],
              transition: 'border-color 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
            }}
          >
            {/* Source handle */}
            <div style={{
              position: 'absolute',
              left: -5,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#fff',
              border: '2px solid #94a3b8',
            }} />
            {/* Target handle */}
            <div style={{
              position: 'absolute',
              right: -5,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: status === 'running' ? '#f59e0b' : '#fff',
              border: `2px solid ${status === 'running' ? '#f59e0b' : '#94a3b8'}`,
              transition: 'all 0.3s',
            }} />
            {/* Node content */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color, fontSize: 12 }}>{nodeTypeIcons[node.type]}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {node.label}
              </span>
            </div>
            {node.subtitle && (
              <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {node.subtitle}
              </div>
            )}
            {/* Running indicator */}
            {status === 'running' && (
              <div style={{
                position: 'absolute',
                top: -3,
                right: -3,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#f59e0b',
                animation: 'pulse 1s infinite',
              }} />
            )}
          </div>
        );
      })}

      {/* Minimap */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        right: 12,
        width: 140,
        height: 80,
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 6,
        overflow: 'hidden',
        padding: 6,
      }}>
        <svg width="100%" height="100%" viewBox="0 0 1200 500">
          {mockNodes.map((node) => (
            <rect
              key={node.id}
              x={node.x}
              y={node.y}
              width={140}
              height={50}
              rx={4}
              fill={nodeTypeColors[node.type] + '30'}
              stroke={nodeTypeColors[node.type]}
              strokeWidth={2}
            />
          ))}
        </svg>
      </div>

      {/* Zoom controls */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        left: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 6,
        overflow: 'hidden',
      }}>
        {['+', '−', '⛶', '🔒'].map((icon) => (
          <button key={icon} style={{
            width: 28,
            height: 28,
            border: 'none',
            background: '#fff',
            cursor: 'pointer',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #f1f5f9',
          }}>
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}

function ConfigPanel() {
  const [tab, setTab] = useState<'config' | 'runs'>('config');
  return (
    <div style={{
      width: 280,
      borderLeft: '1px solid #e2e8f0',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
        {(['config', 'runs'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: '10px 0',
              fontSize: 13,
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? '#1e293b' : '#64748b',
              background: 'transparent',
              border: 'none',
              borderBottom: tab === t ? '2px solid #6366f1' : '2px solid transparent',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {t}
          </button>
        ))}
      </div>
      {/* Content */}
      <div style={{ flex: 1, padding: 16, fontSize: 13, color: '#64748b' }}>
        {tab === 'config' && <div>Select a node to configure</div>}
        {tab === 'runs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <PipelineEventLog compact />
          </div>
        )}
      </div>
    </div>
  );
}

function PipelineHeader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px 16px',
      borderBottom: '1px solid #e2e8f0',
      background: '#fff',
      gap: 12,
    }}>
      <button style={{ background: 'none', border: 'none', fontSize: 16, cursor: 'pointer', color: '#64748b' }}>←</button>
      <span style={{ fontSize: 18 }}>🛡</span>
      <span style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>Content Moderation</span>
      <span style={{ fontSize: 12, color: '#10b981' }}>✓ Saved</span>
      <span style={{ fontSize: 11, color: '#6366f1', background: '#ede9fe', padding: '2px 8px', borderRadius: 4 }}>v3 · Published</span>
      <span style={{ fontSize: 11, color: '#f59e0b' }}>⚠ 10 warnings</span>
      <div style={{ flex: 1 }} />
      <button style={{ fontSize: 12, padding: '5px 12px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>Metrics</button>
      <button style={{ fontSize: 12, padding: '5px 12px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>Export</button>
      <button style={{ fontSize: 12, padding: '5px 12px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>Published</button>
      <button style={{ fontSize: 12, padding: '5px 12px', border: 'none', borderRadius: 6, background: '#6366f1', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>▶ Run</button>
      <button style={{ fontSize: 14, padding: '5px 8px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>⋯</button>
    </div>
  );
}

export default function PipelineEditorDemo() {
  return (
    <SimulatedProvider timeline={pipelineExecutionTimeline} autoPlay>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <PipelineHeader />
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <NodePalette />
          <PipelineCanvas />
          <ConfigPanel />
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </SimulatedProvider>
  );
}
