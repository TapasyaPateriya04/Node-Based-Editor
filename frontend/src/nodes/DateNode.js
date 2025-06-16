// nodes/dateNode.js

import { useState } from 'react';
import BaseNode from './BaseNode';

export const DateNode = ({ id }) => {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <BaseNode id={id} label="Date Picker" inputs={[]} outputs={['date']}>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ width: '100%',background: '#fff8c6', }}
      />
    </BaseNode>
  );
};
