import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  MarkerType,
} from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import 'reactflow/dist/style.css';

// Core Nodes
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

// Additional Nodes
import { MathNode } from './nodes/MathNode';
import { DelayNode } from './nodes/DelayNode';
import { ConditionNode } from './nodes/ConditionNode';
import { EmailNode } from './nodes/EmailNode';
import { LogNode } from './nodes/LogNode';
import { DateNode } from './nodes/DateNode';
import { SwitchNode } from './nodes/SwitchNode';
import { TagNode } from './nodes/TagNode';
import { AlertNode } from './nodes/AlertNode';

// Custom edge with delete button
import CustomEdge from './nodes/CustomEdge';

// Register node types
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  mathNode: MathNode,
  delayNode: DelayNode,
  conditionNode: ConditionNode,
  emailNode: EmailNode,
  logNode: LogNode,
  date: DateNode,
  switch: SwitchNode,
  tag: TagNode,
  alert: AlertNode,
};

// Register edge types
const edgeTypes = {
  custom: CustomEdge,
};

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Select store data
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  removeNode: state.removeNode,
  removeEdges: state.removeEdges,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect: storeOnConnect,
    removeNode,
    removeEdges,
  } = useStore(selector, shallow);

  // Override onConnect to add custom edge type 'custom'
  const onConnect = useCallback(
    (connection) => {
      const newEdge = {
        ...connection,
        type: 'custom', // use your custom edge here
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 20,
          height: 20,
        },
      };
      storeOnConnect(newEdge);
    },
    [storeOnConnect]
  );

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const rawData = event.dataTransfer.getData('application/reactflow');
      if (!rawData) return;

      const appData = JSON.parse(rawData);
      const type = appData?.nodeType;
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodesDelete = (deletedNodes) => {
    deletedNodes.forEach((node) => {
      removeNode(node.id);
    });
  };

  const onEdgesDelete = (deletedEdges) => {
    const deletedEdgeIds = deletedEdges.map((edge) => edge.id);
    removeEdges(deletedEdgeIds);
  };

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={proOptions}
        snapToGrid={true}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
