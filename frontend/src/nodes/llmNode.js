// llmNode.js


import BaseNode from './BaseNode';

export const LLMNode = ({ id, data, selected, onDelete }) => {
  return (
    <BaseNode
      id={id}
      label="LLM"
      inputs={['system', 'prompt']}
      outputs={['response']}
      selected={selected}
      onDelete={onDelete}
      style={{ width: 220, backgroundColor: selected ? '#273246' : '#1C2536' }}
    >
      <div style={{ fontSize: 12, marginTop: 4,backgroundColor: '#fff8c6',color: '#333' }}>
        This is a LLM node.
      </div>
    </BaseNode>
  );
};
