// src/nodes/inputNode.js

import { useState, useEffect } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data, selected, onDelete }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const updateNodeField = useStore((state) => state.updateNodeField);

  // Only sync local state to `data` object (if necessary for React Flow persistence)
  useEffect(() => {
    if (data) {
      data.inputName = currName;
      data.inputType = inputType;
    }
  }, [currName, inputType, data]);

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setCurrName(newValue);
    updateNodeField(id, 'value', newValue); // ✅ update store only on change
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
  };

  return (
    <BaseNode
      id={id}
      label="Input"
      inputs={[]}
      outputs={['value']}
      onDelete={onDelete}
      style={{
        width: 220,
        backgroundColor: selected ? '#273246' : '#1C2536',
        padding: '8px',
        borderRadius: '8px',
      }}
    >
      <div style={{ marginTop: 6, fontSize: 13, color: '#f0f0f0' }}>
        <label style={{ display: 'block', marginBottom: 6 }}>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={{
              width: '100%',
              padding: '4px 6px',
              marginTop: 4,
              marginBottom: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              backgroundColor: '#fff8c6',
              fontSize: 14,
            }}
          />
        </label>
        <label style={{ display: 'block' }}>
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            style={{
              width: '100%',
              backgroundColor: '#fff8c6',
              padding: '4px 6px',
              marginTop: 4,
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: 15,
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
