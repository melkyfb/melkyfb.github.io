import React, { useEffect, useRef, useState } from 'react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  az: string;
  type: 'server' | 'database' | 'gateway' | 'shield';
  status: 'active' | 'syncing' | 'idle';
  load: number;
}

interface Connection {
  from: string;
  to: string;
  latency: number;
  packets: Array<{
    progress: number;
    speed: number;
    size: number;
  }>;
}

export const CloudTopologyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [metrics, setMetrics] = useState({
    latency: '12ms',
    threatLevel: 'MINIMAL',
    uptime: '99.998%',
    cpuLoad: '28%'
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Seed Availability Zones
    const azs = ['eu-central-1a', 'eu-central-1b', 'eu-central-1c'];

    // Create stable but floating nodes
    const nodes: Node[] = [
      { id: 'gw-1', label: 'ALB-Gateway', x: width * 0.15, y: height * 0.5, targetX: width * 0.15, targetY: height * 0.5, az: azs[0], type: 'gateway', status: 'active', load: 45 },
      { id: 'shield-1', label: 'WAF-Shield', x: width * 0.3, y: height * 0.3, targetX: width * 0.3, targetY: height * 0.3, az: azs[0], type: 'shield', status: 'active', load: 12 },
      { id: 'web-1', label: 'ECS-Web-Node-A', x: width * 0.5, y: height * 0.25, targetX: width * 0.5, targetY: height * 0.25, az: azs[0], type: 'server', status: 'active', load: 32 },
      { id: 'web-2', label: 'ECS-Web-Node-B', x: width * 0.5, y: height * 0.75, targetX: width * 0.5, targetY: height * 0.75, az: azs[1], type: 'server', status: 'active', load: 24 },
      { id: 'db-master', label: 'RDS-Postgres-Primary', x: width * 0.8, y: height * 0.4, targetX: width * 0.8, targetY: height * 0.4, az: azs[0], type: 'database', status: 'active', load: 18 },
      { id: 'db-replica', label: 'RDS-Postgres-Replica', x: width * 0.8, y: height * 0.7, targetX: width * 0.8, targetY: height * 0.7, az: azs[2], type: 'database', status: 'syncing', load: 8 }
    ];

    // Setup connections
    const connections: Connection[] = [
      { from: 'gw-1', to: 'shield-1', latency: 2, packets: [] },
      { from: 'shield-1', to: 'web-1', latency: 4, packets: [] },
      { from: 'shield-1', to: 'web-2', latency: 5, packets: [] },
      { from: 'web-1', to: 'db-master', latency: 8, packets: [] },
      { from: 'web-2', to: 'db-master', latency: 9, packets: [] },
      { from: 'db-master', to: 'db-replica', latency: 15, packets: [] },
      { from: 'web-1', to: 'web-2', latency: 3, packets: [] }
    ];

    // Seed initial packet traffic
    connections.forEach((conn) => {
      for (let i = 0; i < 3; i++) {
        conn.packets.push({
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.005,
          size: 2 + Math.random() * 3
        });
      }
    });

    let time = 0;

    // Animation Loop
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw AWS Availability Zone boxes (light background blocks)
      const drawAZBox = (name: string, x: number, y: number, w: number, h: number) => {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.strokeStyle = 'rgba(203, 213, 225, 0.4)';
        ctx.lineWidth = 1;
        // Rounded rect for clean feel
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, w, h, 12) : ctx.rect(x, y, w, h);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.font = '10px monospace';
        ctx.fillStyle = '#64748b';
        ctx.fillText(name.toUpperCase(), x + 12, y + 20);
        ctx.restore();
      };

      // Draw Availability Zone Boundaries dynamically
      drawAZBox('Availability Zone: eu-central-1a', width * 0.26, height * 0.15, width * 0.62, height * 0.42);
      drawAZBox('Availability Zone: eu-central-1b', width * 0.42, height * 0.62, width * 0.24, height * 0.28);
      drawAZBox('Availability Zone: eu-central-1c', width * 0.72, height * 0.62, width * 0.24, height * 0.28);

      // Draw Connections (network topology lines)
      connections.forEach((conn) => {
        const fromNode = nodes.find((n) => n.id === conn.from);
        const toNode = nodes.find((n) => n.id === conn.to);
        if (!fromNode || !toNode) return;

        ctx.save();
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
        ctx.restore();

        // Update & Draw packets
        conn.packets.forEach((pkt) => {
          pkt.progress += pkt.speed;
          if (pkt.progress > 1) {
            pkt.progress = 0;
            pkt.speed = 0.003 + Math.random() * 0.005;
          }

          // Calculate current coords
          const px = fromNode.x + (toNode.x - fromNode.x) * pkt.progress;
          const py = fromNode.y + (toNode.y - fromNode.y) * pkt.progress;

          ctx.save();
          ctx.fillStyle = '#0ea5e9'; // cerulean packets
          ctx.beginPath();
          ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(14, 165, 233, 0.6)';
          ctx.fill();
          ctx.restore();
        });
      });

      // Draw Nodes
      nodes.forEach((node) => {
        // Floating effect
        const wobbleX = Math.sin(time + node.label.length) * 4;
        const wobbleY = Math.cos(time + node.label.length) * 4;
        node.x = node.targetX + wobbleX;
        node.y = node.targetY + wobbleY;

        ctx.save();
        // Inner Glassy card for nodes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#cbd5e1';
        ctx.strokeStyle = node.status === 'syncing' ? 'rgba(234, 179, 8, 0.4)' : 'rgba(14, 165, 233, 0.3)';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(node.x - 55, node.y - 25, 110, 50, 8) : ctx.rect(node.x - 55, node.y - 25, 110, 50);
        ctx.fill();
        ctx.stroke();

        // Status indicator dot
        ctx.beginPath();
        ctx.arc(node.x - 40, node.y - 10, 4, 0, Math.PI * 2);
        if (node.status === 'active') {
          ctx.fillStyle = '#10b981'; // Green
        } else if (node.status === 'syncing') {
          ctx.fillStyle = '#eab308'; // Amber
        } else {
          ctx.fillStyle = '#94a3b8'; // Grey
        }
        ctx.fill();

        // Node Label
        ctx.font = 'bold 9px monospace';
        ctx.fillStyle = '#1e293b';
        ctx.fillText(node.label, node.x - 28, node.y - 8);

        // Subtext / Metadata
        ctx.font = '8px monospace';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`AZ: ${node.az}`, node.x - 40, node.y + 6);
        ctx.fillText(`Ld: ${node.load}% | RTT: ${node.type === 'gateway' ? '2' : '8'}ms`, node.x - 40, node.y + 16);

        ctx.restore();
      });

      // Update random metrics periodically for realism
      if (Math.random() < 0.02) {
        setMetrics({
          latency: `${(10 + Math.random() * 5).toFixed(1)}ms`,
          threatLevel: 'MINIMAL',
          uptime: '99.998%',
          cpuLoad: `${Math.floor(25 + Math.random() * 8)}%`
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Floating Glassmorphic HUD overlay (top right & top left) */}
      <div className="absolute bottom-6 left-6 z-10 glass-panel border border-white/50 px-4 py-3 rounded-xl shadow-neumorphic-sm-out font-mono text-[10px] text-slate-medium flex flex-col gap-1 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-dark text-[11px]">VPC REALTIME TOPOLOGY</span>
        </div>
        <div className="h-[1px] bg-slate-200/60 my-1" />
        <div>REGION: <span className="text-cerulean font-bold">eu-central-1 (Munich)</span></div>
        <div>VPC SUBNETS: <span className="text-slate-dark font-bold">3 Public | 3 Private</span></div>
        <div>GATEWAY STATUS: <span className="text-emerald-600 font-bold">ROUTING</span></div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 glass-panel border border-white/50 px-4 py-3 rounded-xl shadow-neumorphic-sm-out font-mono text-[10px] text-slate-medium flex flex-col gap-1 pointer-events-auto">
        <div className="font-bold text-slate-dark text-[11px] mb-1">SYSTEM MONITOR (Live)</div>
        <div className="h-[1px] bg-slate-200/60 my-1" />
        <div className="flex justify-between gap-6">
          <span>LATENCY:</span>
          <span className="text-cerulean font-bold">{metrics.latency}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span>SEC THREAT:</span>
          <span className="text-emerald-600 font-bold">{metrics.threatLevel}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span>AWS UPTIME:</span>
          <span className="text-slate-dark font-bold">{metrics.uptime}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span>CPU LOAD:</span>
          <span className="text-slate-dark font-bold">{metrics.cpuLoad}</span>
        </div>
      </div>
    </div>
  );
};
