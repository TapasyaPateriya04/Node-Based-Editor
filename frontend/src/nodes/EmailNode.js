// nodes/EmailNode.js

import { useEffect, useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const EmailNode = ({ id, data }) => {
  const [status, setStatus] = useState('Waiting...');
  const [lastTrigger, setLastTrigger] = useState(null);

  const getInputData = useStore((state) => state.getInputData);
  const updateNodeField = useStore((state) => state.updateNodeField);

useEffect(() => {
  const inputData = getInputData(id);
  const { to, subject, message, trigger } = inputData || {};

  if (trigger !== lastTrigger && trigger) {
    setLastTrigger(trigger);

    // Simulate sending email with details
    const summary = `Email sent to ${to || '[unknown]'}\nSubject: ${subject || 'No subject'}\nMessage: ${message || 'No message'}`;

    setStatus(summary);
    updateNodeField(id, 'output', summary);
  }
}, [getInputData, id, lastTrigger, updateNodeField]);


  return (
    <BaseNode id={id} label="Email" inputs={['to', 'subject', 'message', 'trigger']} outputs={['output']}>
      <div
  style={{
    background: '#fff8c6',
    padding: '6px 8px',
    color: '#333',
    borderRadius: '4px',
    fontSize: '0.85em',
    textAlign: 'left',
    whiteSpace: 'pre-line', // 👈 Ensures line breaks show
  }}
>
  {status}
</div>

    </BaseNode>
  );
};
