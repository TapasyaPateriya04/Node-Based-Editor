// store.js

import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  nodeValues: {},

  // Generate unique IDs per node type
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (!newIDs[type]) newIDs[type] = 0;
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  // Add a new node
  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  // Handle node changes (e.g., drag, update)
  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  // Handle edge changes (e.g., deletion, update)
  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  // Connect two nodes with an edge
  onConnect: (connection) => {
    const newEdge = {
      ...connection,
      type: 'custom', // Required to use CustomEdge.js
      animated: true,
      markerEnd: {
        type: MarkerType.Arrow,
        width: 20,
        height: 20,
      },
    };
    set((state) => ({
      edges: addEdge(newEdge, state.edges),
    }));
  },

  // Update a field inside a node and its output store
  updateNodeField: (nodeId, field, value) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                [field]: value,
              },
            }
          : node
      ),
      nodeValues: {
        ...state.nodeValues,
        [nodeId]: {
          ...(state.nodeValues[nodeId] || {}),
          [field]: value,
        },
      },
    }));
  },

  // Get input values to a node by inspecting incoming edges
  getInputData: (nodeId) => {
    const { edges, nodeValues } = get();
    const inputData = {};

    const incomingEdges = edges.filter((e) => e.target === nodeId);
    for (const edge of incomingEdges) {
      const { source, sourceHandle, targetHandle } = edge;
      const sourceVal = nodeValues[source]?.[sourceHandle];
      if (sourceVal !== undefined) {
        inputData[targetHandle] = sourceVal;
      }
    }

    return inputData;
  },

  // Remove a node and all connected edges
  removeNode: (id) => {
    set((state) => {
      const newNodes = state.nodes.filter((node) => node.id !== id);
      const newEdges = state.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      );
      return { nodes: newNodes, edges: newEdges };
    });
  },

  // Remove multiple edges by their IDs
  removeEdges: (edgeIds) => {
    set((state) => {
      const newEdges = state.edges.filter((edge) => !edgeIds.includes(edge.id));
      return { edges: newEdges };
    });
  },
  
  // Theme state
  darkMode: false,
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
}));