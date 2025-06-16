import React from 'react';
import { getBezierPath } from 'reactflow';
import { useStore } from '../store';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const { removeEdges } = useStore();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const handleDelete = () => {
    removeEdges([id]);
  };

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={30}
        height={30}
        x={labelX - 15}
        y={labelY - 15}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
       <div
        onClick={handleDelete}
        style={{
            marginTop: 5,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#ff0000',
            cursor: 'pointer',
            userSelect: 'none',
            opacity: 0,
            animation: 'fadeIn 0.5s forwards',
        }}
        >
        ×
        </div>

        <style>
        {`
            @keyframes fadeIn {
            to {
                opacity: 1;
            }
            }
        `}
        </style>

      </foreignObject>
    </>
  );
};

export default CustomEdge;