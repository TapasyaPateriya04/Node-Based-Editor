import { useEffect, useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const SwitchNode = ({ id }) => {
  const [status, setStatus] = useState('Waiting...');
  const getInputData = useStore((state) => state.getInputData);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const inputData = getInputData(id);
  const input = inputData?.input;

  useEffect(() => {
    if (typeof input !== 'undefined') {
      const isTrue = input === true || input === 'true';

      setStatus(`Condition ${isTrue ? 'Matched' : 'Did not Match'}`);

      updateNodeField(id, 'trueOutput', isTrue ? input : undefined);
      updateNodeField(id, 'falseOutput', !isTrue ? input : undefined);
    }
  }, [input, updateNodeField, id]);

  return (
    <BaseNode
      id={id}
      label="Switch"
      inputs={['input']}
      outputs={['trueOutput', 'falseOutput']}
    >
      <div
        style={{
          backgroundColor: '#fff8c6',
          color: '#333',
          padding: '6px 8px',
          borderRadius: '4px',
          fontSize: '0.85em',
        }}
      >
        {status}
      </div>
    </BaseNode>
  );
};
