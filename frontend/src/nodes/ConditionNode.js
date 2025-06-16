// src/nodes/ConditionNode.js
import { useEffect, useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const ConditionNode = ({ id, data }) => {
  const [inputLeft, setInputLeft] = useState('');
  const [inputRight, setInputRight] = useState('');
  const [operator, setOperator] = useState('==');
  const [result, setResult] = useState(false);

  const getInputData = useStore((state) => state.getInputData);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    const inputData = getInputData(id);
    const left = inputData?.left ?? inputLeft;
    const right = inputData?.right ?? inputRight;
    let res = false;

    switch (operator) {
      case '==':
        res = left === right;
        break;
      case '!=':
        res = left !== right;
        break;
      case '>':
        res = left > right;
        break;
      case '<':
        res = left < right;
        break;
      case '>=':
        res = left >= right;
        break;
      case '<=':
        res = left <= right;
        break;
      default:
        res = false;
    }

    setResult(res);
    updateNodeField(id, 'result', res);
  }, [inputLeft, inputRight, operator, getInputData, updateNodeField, id]);

  return (
    <BaseNode id={id} label="Condition" inputs={['left', 'right']} outputs={['result']}>
      <input
        type="text"
        placeholder="Left"
        value={inputLeft}
        onChange={(e) => setInputLeft(e.target.value)}
        style={{ width: '100%', marginBottom: 4,background: '#fff8c6' }}
      />
      <select
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        style={{ width: '100%', marginBottom: 4,background: '#fff8c6' }}
      >
        <option value="==">==</option>
        <option value="!=">!=</option>
        <option value=">">&gt;</option>
        <option value="<">&lt;</option>
        <option value=">=">&gt;=</option>
        <option value="<=">&lt;=</option>
      </select>
      <input
        type="text"
        placeholder="Right"
        value={inputRight}
        onChange={(e) => setInputRight(e.target.value)}
        style={{ width: '100%', marginBottom: 8 ,background: '#fff8c6' }}
      />
      <div
        style={{
          backgroundColor: '#fff8c6',
          color: '#000',
          padding: '5px 8px',
          borderRadius: '4px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Result: {result.toString()}
      </div>
    </BaseNode>
  );
};
