/**
 * Autonomous System — idle intelligence state machine.
 * Runs inside useFrame via AutonomousTick component.
 * Consumed by Node and EdgeStreams components.
 */

export type NodeId = 'HUB' | 'AIML' | 'CYBER' | 'SYSTEMS' | 'BACKEND';

export interface ActiveSignal {
  id: string;
  from: NodeId;
  to: NodeId;
  t: number;       // 0→1 travel progress
  speed: number;
  color: string;
}

export const NODE_COLORS: Record<NodeId, string> = {
  HUB:     '#00d4ff',
  AIML:    '#00d4ff',
  CYBER:   '#ff3c5c',
  SYSTEMS: '#f0a500',
  BACKEND: '#00ff88',
};

const DOMAIN_NODES: NodeId[] = ['AIML', 'CYBER', 'SYSTEMS', 'BACKEND'];

export const autonomousSystem = {
  signals:      [] as ActiveSignal[],
  nodeActivity: { HUB: 0, AIML: 0, CYBER: 0, SYSTEMS: 0, BACKEND: 0 } as Record<NodeId, number>,
  lastEvent:    0,   // elapsed time (seconds)
  nextIn:       4.5, // seconds until next event
  _counter:     0,
  _pendingReturn: null as { from: NodeId; color: string } | null,
};

export function tickAutonomousSystem(delta: number, elapsed: number) {
  const sys = autonomousSystem;

  // ── Spawn new signal sequence ──────────────────────────────
  if (elapsed - sys.lastEvent > sys.nextIn && sys.signals.length === 0) {
    const src   = DOMAIN_NODES[Math.floor(Math.random() * DOMAIN_NODES.length)];
    const color = NODE_COLORS[src];

    sys.signals.push({
      id:    `${sys._counter++}`,
      from:  src,
      to:    'HUB',
      t:     0,
      speed: 0.38 + Math.random() * 0.18,
      color,
    });

    sys.nodeActivity[src] = 1.0;
    sys.lastEvent = elapsed;
    sys.nextIn    = 5 + Math.random() * 5.5;
    sys._pendingReturn = { from: src, color };
  }

  // ── Advance active signals ─────────────────────────────────
  for (const sig of sys.signals) {
    sig.t = Math.min(1, sig.t + sig.speed * delta);

    if (sig.t >= 1) {
      if (sig.to === 'HUB' && sys._pendingReturn) {
        // Arrived at hub — spawn return leg to a random other node
        const others = DOMAIN_NODES.filter(n => n !== sys._pendingReturn!.from);
        const dest   = others[Math.floor(Math.random() * others.length)];

        sys.signals.push({
          id:    `${sys._counter++}`,
          from:  'HUB',
          to:    dest,
          t:     0,
          speed: 0.28 + Math.random() * 0.14,
          color: sys._pendingReturn.color,
        });
        sys.nodeActivity['HUB'] = 0.85;
        sys._pendingReturn = null;

      } else if (sig.to !== 'HUB') {
        // Arrived at destination domain node
        sys.nodeActivity[sig.to] = 1.0;
      }
    }
  }

  // ── Clean up completed signals ─────────────────────────────
  sys.signals = sys.signals.filter(s => s.t < 1);

  // ── Decay node activity ────────────────────────────────────
  const DECAY = 1.1;
  for (const k of Object.keys(sys.nodeActivity) as NodeId[]) {
    sys.nodeActivity[k] = Math.max(0, sys.nodeActivity[k] - delta * DECAY);
  }
}
