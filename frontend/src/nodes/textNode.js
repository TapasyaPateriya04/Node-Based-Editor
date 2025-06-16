// textNode.js

import { useEffect, useRef, useState } from 'react';
import BaseNode from './BaseNode';

export const TextNode = ({ id, data = {}, selected, onDelete }) => {
  const [text, setText] = useState(data.text || '');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Resize textarea height automatically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // Detect variables in form {{variableName}}
  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const found = new Set();
    let match;

    while ((match = regex.exec(text))) {
      found.add(match[1]);
    }

    setVariables([...found]);
    data.text = text;
    data.variables = [...found]; // Optional: keep track in data
  }, [text, data]);

  return (
    <BaseNode
      id={id}
      label="Text"
      inputs={variables}
      outputs={['result']}
      onDelete={onDelete}
      selected={selected}
      style={{
        width: 250,
        backgroundColor: '#1C2536',
        padding: 10,
        fontSize: 14,
      }}
    >

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text here, use {{variables}}..."
        style={{
          width: '100%',
          minHeight: '50px',
          resize: 'none',
          backgroundColor: '#fff8c6',
          color: '#0a0a0a',
          padding: '6px',
          borderRadius: '4px',
          fontSize: 13,
        }}
      />
    </BaseNode>
  );
};
