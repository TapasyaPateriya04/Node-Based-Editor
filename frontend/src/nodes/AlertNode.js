// nodes/AlertNode.js

import { useEffect, useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const AlertNode = ({ id }) => {
  const [lastTrigger, setLastTrigger] = useState(null);
  const [status, setStatus] = useState('Waiting...');

  const getInputData = useStore((state) => state.getInputData);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    const inputData = getInputData(id);
    const { message, trigger } = inputData || {};

    if (trigger !== lastTrigger && trigger) {
      setLastTrigger(trigger);

      const msg = message || 'Default alert!';
      window.alert(msg);

      setStatus(`Alert shown: "${msg}"`);
      updateNodeField(id, 'output', `Alerted: ${msg}`);
    }
  }, [getInputData, id, lastTrigger, updateNodeField]);

  return (
    <BaseNode id={id} label="Alert" inputs={['message', 'trigger']} outputs={['output']}>
      <div
        style={{
          backgroundColor: '#fff8c6',
          color: '#333',
          padding: '6px 8px',
          borderRadius: '4px',
          fontSize: '0.90em',
        }}
      >
        {status}
      </div>
    </BaseNode>
  );
};
