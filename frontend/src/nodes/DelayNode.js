// nodes/DelayNode.js

import { useEffect, useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(1000); // default 1 sec
  const [localInput, setLocalInput] = useState('');

  const getInputData = useStore((state) => state.getInputData);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    const inputData = getInputData(id);
    const incoming = inputData?.input;

    if (incoming !== localInput) {
      setLocalInput(incoming);

      const timeout = setTimeout(() => {
        updateNodeField(id, 'output', incoming); // pass forward
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [getInputData, id, localInput, delay, updateNodeField]);

  return (
    <BaseNode id={id} label="Delay" inputs={['input']} outputs={['output']}>
      <input
        type="number"
        placeholder="Delay (ms)"
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        style={{ width: '100%' ,background: '#fff8c6',}}
      />
    </BaseNode>
  );
};
