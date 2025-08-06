import { useState } from 'react';
import axios from 'axios';

function HabitForm({ onAdd }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    const res = await axios.post('http://localhost:5000/api/habits', { name });
    onAdd(res.data);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New habit"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  );
}

export default HabitForm;
