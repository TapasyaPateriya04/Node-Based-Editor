export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '101px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#1C2536',
        justifyContent: 'center',
        flexDirection: 'column',
        userSelect: 'none',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#273246')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1C2536')}
      draggable
    >
      <span style={{ color: '#fff', fontWeight: 600, fontSize: '14px' }}>{label}</span>
    </div>
  );
};