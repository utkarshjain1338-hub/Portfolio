import React from 'react';
import { Node, NodeData } from './Node';

const NODES: NodeData[] = [
  {
    id: 'HUB',
    label: 'UTKARSH',
    sublabel: 'SYSTEM HUB',
    position: [0, 0, 0],
    color: '#00d4ff',
    isHub: true,
  },
  {
    id: 'AIML',
    label: 'AI / ML',
    position: [0, 2.5, 0],
    color: '#00d4ff',
  },
  {
    id: 'CYBER',
    label: 'CYBERSECURITY',
    position: [-2.5, 0, 0],
    color: '#ff3c5c',
  },
  {
    id: 'SYSTEMS',
    label: 'SYSTEMS',
    position: [2.5, 0, 0],
    color: '#f0a500',
  },
  {
    id: 'BACKEND',
    label: 'BACKEND',
    position: [0, -2.5, 0],
    color: '#00ff88',
  },
];

interface NodesProps {
  onNodeHover?: (id: string | null) => void;
}

export const Nodes: React.FC<NodesProps> = ({ onNodeHover }) => {
  return (
    <group>
      {NODES.map((node) => (
        <Node key={node.id} {...node} onHover={onNodeHover} />
      ))}
    </group>
  );
};

export { NODES };
