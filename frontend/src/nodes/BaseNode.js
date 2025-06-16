import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

const BaseNode = ({ id, label, inputs = [], outputs = [], children, style }) => {
  const removeNode = useStore((state) => state.removeNode);

  // Calculate vertical positions for handles (evenly spaced)
  const inputCount = inputs.length;
  const outputCount = outputs.length;

  const getHandleTop = (index, total) => {
    if (total === 1) return '50%';
    return `${((index + 1) / (total + 1)) * 100}%`;
  };

  // Delete handler
  const handleDelete = () => {
    removeNode(id);
  };

  return (
    <div
      style={{
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#1C2536',
        color: 'white',
        minWidth: 150,
        minHeight: 60,
        boxShadow: '0 0 8px rgba(0,0,0,0.2)',
        position: 'relative',
        ...style,
      }}
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        title="Delete Node"
        style={{
          position: 'absolute',
          top: 4,
          right: 4,
          border: 'none',
          background: 'transparent',
          color: 'red',
          fontWeight: 'bold',
          fontSize: 16,
          cursor: 'pointer',
          lineHeight: 1,
          padding: 0,
          userSelect: 'none',
        }}
        aria-label="Delete node"
      >
        ×
      </button>

      {/* Input Handles on left */}
      {inputs.map((input, i) => (
        <Handle
          key={`input-${input}`}
          type="target"
          position={Position.Left}
          id={input}
          style={{ top: getHandleTop(i, inputCount), transform: 'translateY(-50%)' }}
        />
      ))}

      {/* Content */}
      <div style={{ textAlign: 'center', userSelect: 'none' }}>
        <strong>{label}</strong>
        <div>{children}</div>
      </div>

      {/* Output Handles on right */}
      {outputs.map((output, i) => (
        <Handle
          key={`output-${output}`}
          type="source"
          position={Position.Right}
          id={output}
          style={{ top: getHandleTop(i, outputCount), transform: 'translateY(-50%)' }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
