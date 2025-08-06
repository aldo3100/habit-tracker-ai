import axios from 'axios';

function HabitList({ habits, setHabits }) {
  const completeHabit = async (id) => {
    await axios.put(`http://localhost:5000/api/habits/${id}`, { date: new Date() });
    const updated = habits.map(h => h._id === id ? { ...h, completedDates: [...h.completedDates, new Date()] } : h);
    setHabits(updated);
  };

  const deleteHabit = async (id) => {
    await axios.delete(`http://localhost:5000/api/habits/${id}`);
    setHabits(habits.filter(h => h._id !== id));
  };

  return (
    <ul>
      {habits.map(habit => (
        <li key={habit._id}>
          {habit.name}
          <button onClick={() => completeHabit(habit._id)}>Complete</button>
          <button onClick={() => deleteHabit(habit._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default HabitList;
