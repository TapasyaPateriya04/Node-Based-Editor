// nodes/TagNode.js

import { useEffect, useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const TagNode = ({ id }) => {
  const [tagged, setTagged] = useState('');

  const getInputData = useStore((state) => state.getInputData);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    const inputData = getInputData(id);
    const { input, tag } = inputData || {};

    if (input !== undefined && tag) {
      const result = { value: input, tag };
      setTagged(`Tagged with "${tag}"`);
      updateNodeField(id, 'output', result);
    }
  }, [getInputData, id, updateNodeField]);

  return (
    <BaseNode id={id} label="Tag" inputs={['input', 'tag']} outputs={['output']}>
      <div
        style={{
          background: '#fff8c6',
          padding: '6px 8px',
          borderRadius: '4px',
          fontSize: '0.9em',
          color: '#333',
        }}
      >
        {tagged || 'Waiting...'}
      </div>
    </BaseNode>
  );
};
