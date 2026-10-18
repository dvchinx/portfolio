import { useId } from 'react';

const TABLE_HEADER = 30;
const TABLE_ROW = 22;

function nodeHeight(node) {
  if (!node.table) return node.h;
  return TABLE_HEADER + node.fields.length * (node.rowHeight ?? TABLE_ROW) + 6;
}

const toPath = (points) =>
  points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');

function stateClass(isActive, hasStep) {
  if (!hasStep) return '';
  return isActive ? 'is-on' : 'is-dim';
}

function DiagramNode({ node, state }) {
  const height = nodeHeight(node);

  if (node.table) {
    const rowHeight = node.rowHeight ?? TABLE_ROW;
    return (
      <g className={`fd-node fd-table ${state}`}>
        <rect className="fd-node__box" x={node.x} y={node.y} width={node.w} height={height} />
        <rect className="fd-node__head" x={node.x} y={node.y} width={node.w} height={TABLE_HEADER} />
        <text className="fd-node__label fd-node__label--head" x={node.x + 12} y={node.y + 20}>
          {node.label}
        </text>
        {node.fields.map((field, i) => (
          <text
            key={field}
            className="fd-node__field"
            x={node.x + 12}
            y={node.y + TABLE_HEADER + rowHeight * i + rowHeight * 0.72}
          >
            {field}
          </text>
        ))}
      </g>
    );
  }

  return (
    <g className={`fd-node ${state}`}>
      <rect className="fd-node__box" x={node.x} y={node.y} width={node.w} height={height} />
      <text className="fd-node__label" x={node.x + 12} y={node.y + 26}>
        {node.label}
      </text>
      {node.sub && (
        <text className="fd-node__sub" x={node.x + 12} y={node.y + 45}>
          {node.sub}
        </text>
      )}
    </g>
  );
}

/**
 * Architecture diagram drawn from data. `step` highlights a subset of nodes and
 * edges and sends packets along the active edges; without a step the whole
 * system is shown in its neutral state.
 */
function FlowDiagram({ diagram, step = null, stepKey = 'overview', title, animated = true }) {
  const id = useId().replace(/:/g, '');
  const hasStep = Boolean(step);
  const activeNodes = new Set(step?.nodes ?? []);
  const activeEdges = new Set(step?.edges ?? []);
  const edgesById = Object.fromEntries(diagram.edges.map((edge) => [edge.id, edge]));
  const packets = animated && step ? step.packets ?? [] : [];

  return (
    <svg
      className="fd"
      viewBox={diagram.viewBox}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path className="fd-arrow" d="M0 0 L10 5 L0 10 z" />
        </marker>
        <marker id={`${id}-arrow-on`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path className="fd-arrow fd-arrow--on" d="M0 0 L10 5 L0 10 z" />
        </marker>
      </defs>

      {diagram.groups?.map((group) => (
        <g key={group.id} className="fd-group">
          <rect x={group.x} y={group.y} width={group.w} height={group.h} />
          <text x={group.x + 10} y={group.y + 16}>{group.label}</text>
        </g>
      ))}

      {diagram.edges.map((edge) => {
        const isActive = activeEdges.has(edge.id);
        const state = stateClass(isActive, hasStep);
        return (
          <g key={edge.id} className={`fd-edge ${state} ${edge.plain ? 'fd-edge--plain' : ''}`}>
            <path
              d={toPath(edge.points)}
              markerEnd={edge.plain ? undefined : `url(#${id}-arrow${isActive ? '-on' : ''})`}
            />
            {edge.label && (
              <text
                x={edge.labelAt[0]}
                y={edge.labelAt[1]}
                textAnchor={edge.anchor ?? 'middle'}
              >
                {edge.label}
              </text>
            )}
          </g>
        );
      })}

      {diagram.nodes.map((node) => (
        <DiagramNode
          key={node.id}
          node={node}
          state={stateClass(activeNodes.has(node.id), hasStep)}
        />
      ))}

      {packets.map((edgeId, i) => {
        const edge = edgesById[edgeId];
        if (!edge) return null;
        return (
          <rect
            key={`${stepKey}-${edgeId}`}
            className="fd-packet"
            x="-4"
            y="-4"
            width="8"
            height="8"
            visibility="hidden"
          >
            <set attributeName="visibility" to="visible" begin={`${i * 0.4}s`} />
            <animateMotion
              dur="1.6s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
              path={toPath(edge.points)}
              fill="freeze"
            />
          </rect>
        );
      })}
    </svg>
  );
}

export default FlowDiagram;
