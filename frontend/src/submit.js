import { useStore } from './store';

export const SubmitButton = () => {
  const { nodes, edges, darkMode } = useStore();

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error('Failed to submit pipeline');

      const data = await response.json();

      alert(`Pipeline Info:
Number of Nodes: ${data.num_nodes}
Number of Edges: ${data.num_edges}
Is DAG: ${data.is_dag ? 'Yes' : 'No'}`);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div
      style={{
        padding: '15px',
        borderTop: darkMode ? '1px solid #444' : '1px solid #eee',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: darkMode ? '#1a1a1a' : '#f9f9f9',
      }}
    >
      <button
        onClick={handleSubmit}
        type="button"
        style={{
          padding: '10px 20px',
          backgroundColor: darkMode ? '#fff8c6' : '#1C2536',
          color: darkMode ? 'black' : 'white',
          border: 'none',
          fontWeight: 'bold',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Submit
      </button>
    </div>
  );
};
