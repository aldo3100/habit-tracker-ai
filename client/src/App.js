import { useEffect, useState } from 'react';
import axios from 'axios';
import HabitForm from './HabitForm';
import HabitList from './HabitList';

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/habits').then(res => setHabits(res.data));
  }, []);

  return (
    <div className="App">
      <h1>Habit Tracker AI</h1>
      <HabitForm onAdd={habit => setHabits([...habits, habit])} />
      <HabitList habits={habits} setHabits={setHabits} />
    </div>
  );
}

export default App;


