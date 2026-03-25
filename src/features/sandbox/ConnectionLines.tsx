import type { SandboxComponentInstance, SandboxConnection } from '../../types';

interface Props {
  components: SandboxComponentInstance[];
  connections: SandboxConnection[];
}

const COMP_W = 100;
const COMP_H = 64;

function center(c: SandboxComponentInstance) {
  return { x: c.position.x + COMP_W / 2, y: c.position.y + COMP_H / 2 };
}

export default function ConnectionLines({ components, connections }: Props) {
  if (connections.length === 0) return null;

  return (
    <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
        </marker>
      </defs>
      {connections.map((conn) => {
        const src = components.find((c) => c.id === conn.from);
        const tgt = components.find((c) => c.id === conn.to);
        if (!src || !tgt) return null;

        const a = center(src);
        const b = center(tgt);
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;

        return (
          <g key={conn.id}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#6366f1"
              strokeWidth={2}
              markerEnd="url(#arrowhead)"
            />
            {conn.label && (
              <text
                x={midX}
                y={midY - 6}
                textAnchor="middle"
                fill="#a5b4fc"
                fontSize={11}
                fontFamily="sans-serif"
              >
                {conn.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
