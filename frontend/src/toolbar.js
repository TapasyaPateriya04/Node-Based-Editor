import { useEffect } from 'react';
import { DraggableNode } from './draggableNode';
import { useStore } from './store';

const nodeList = [
  { type: 'customInput', label: 'Input' },
  { type: 'llm', label: 'LLM' },
  { type: 'customOutput', label: 'Output' },
  { type: 'text', label: 'Text' },
  { type: 'date', label: 'Date' },
  { type: 'switch', label: 'Switch' },
  { type: 'tag', label: 'Tag' },
  { type: 'alert', label: 'Alert' },
  { type: 'mathNode', label: 'Math' },
  { type: 'delayNode', label: 'Delay' },
  { type: 'conditionNode', label: 'Condition' },
  { type: 'emailNode', label: 'Email' },
  { type: 'logNode', label: 'Log' },
];

export const PipelineToolbar = () => {
  const darkMode = useStore((state) => state.darkMode);
  const toggleTheme = useStore((state) => state.toggleTheme);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#1C2536' : '#f9f9f9';
  }, [darkMode]);

  return (
    <div style={{ padding: '10px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{
          fontSize: '18px',
          margin: 0,
          textAlign: 'center',
          color: darkMode ? '#fff' : '#1C2536'
        }}>
          Drag To Add Nodes
        </h2>
        <button
          onClick={toggleTheme}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: darkMode ? '#fff8c6' : '#1C2536',
            color: darkMode ? '#1C2536' : '#fff',
          }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div style={{
        marginTop: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        {nodeList.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} />
        ))}
      </div>
    </div>
  );
};
