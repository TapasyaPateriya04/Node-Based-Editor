// src/nodes/OutputNode.js
import { useEffect, useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id }) => {
  const getInputData = useStore((state) => state.getInputData);
  const [incomingValue, setIncomingValue] = useState('');
  const inputData = getInputData(id);

  useEffect(() => {
    // Check all possible fields in order of priority
    const value =
      inputData?.input ??
      inputData?.result ??
      inputData?.trueOutput ??
      inputData?.falseOutput ??
      '';

    setIncomingValue(value);
  }, [getInputData, id, inputData]); // Trigger re-render on live changes

  return (
    <BaseNode id={id} label="Output" inputs={['input']}>
      <div
        style={{
          padding: '8px',
          marginTop: '8px',
          backgroundColor: '#fff8c6',
          borderRadius: '4px',
          fontSize: '15px',
          color: '#0a0a0a',
          minHeight: '28px',
        }}
      >
        {incomingValue?.toString() || 'Waiting for input...'}
      </div>
    </BaseNode>
  );
};
