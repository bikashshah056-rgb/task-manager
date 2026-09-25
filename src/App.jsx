import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // stops the page from refreshing
    if (taskText.trim() === '') return; // ignore empty input

    const newTask = {
      id: Date.now(), // a quick unique id
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]); // add the new task to the list
    setTaskText(''); // clear the input box
  }

  return (
    <div className="app">
      <h1>My Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;