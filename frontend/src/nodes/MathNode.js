// src/nodes/MathNode.jsx
import { useEffect, useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const MathNode = ({ id, data }) => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const getInputData = useStore((state) => state.getInputData);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Compute sum whenever inputs change
  useEffect(() => {
    const inputData = getInputData(id);
    const inputA = parseFloat(inputData?.a ?? a);
    const inputB = parseFloat(inputData?.b ?? b);

    if (!isNaN(inputA) && !isNaN(inputB)) {
      const sum = inputA + inputB;
      updateNodeField(id, 'result', sum); // send to other nodes
    }
  }, [a, b, getInputData, updateNodeField, id]);

  return (
    <BaseNode id={id} label="Add" inputs={['a', 'b']} outputs={['result']}>
      <input
        type="number"
        placeholder="A"
        value={a}
        onChange={(e) => setA(e.target.value)}
        style={{ width: '100%', marginBottom: 4, background: '#fff8c6',textAlign: 'center',color: '#333' }}
      />
      <input
        type="number"
        placeholder="B"
        value={b}
        onChange={(e) => setB(e.target.value)}
        style={{ width: '100%',background: '#fff8c6' ,textAlign: 'center',color: '#333' }}
      />
    </BaseNode>
  );
};
