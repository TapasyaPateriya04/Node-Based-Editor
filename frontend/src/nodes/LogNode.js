// nodes/LogNode.js

import { useEffect, useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const LogNode = ({ id }) => {
  const [lastTrigger, setLastTrigger] = useState(null);
  const [logText, setLogText] = useState('Waiting for trigger...');

  const getInputData = useStore((state) => state.getInputData);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    const inputData = getInputData(id);
    const { message, trigger } = inputData || {};

    if (trigger !== lastTrigger && trigger) {
      setLastTrigger(trigger);

      const text = message || '[No message]';
      console.log(`📦 LogNode (${id}):`, text);

      setLogText(`Logged: ${text}`);
      updateNodeField(id, 'output', `Logged: ${text}`);
    }
  }, [getInputData, id, lastTrigger, updateNodeField]);

  return (
    <BaseNode id={id} label="Log" inputs={['message', 'trigger']} outputs={['output']}>
      <div
        style={{
          background: '#fff8c6',
          color: '#333',
          padding: '6px 8px',
          borderRadius: '4px',
          fontSize: '0.85em',
          whiteSpace: 'pre-line',
        }}
      >
        {logText}
      </div>
    </BaseNode>
  );
};
