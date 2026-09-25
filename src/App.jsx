import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    // Load saved tasks from localStorage when the app first starts
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [taskText, setTaskText] = useState('');
  const [category, setCategory] = useState('Personal');
  const [filter, setFilter] = useState('all');

  // Whenever "tasks" changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleSubmit(e) {
    e.preventDefault();
    if (taskText.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      category: category,
    };

    setTasks([...tasks, newTask]);
    setTaskText('');
  }

  function toggleComplete(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const remainingCount = tasks.filter((task) => !task.completed).length;

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
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Urgent">Urgent</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <p>{remainingCount} task(s) remaining</p>

      {visibleTasks.length === 0 ? (
        <p>No tasks to show.</p>
      ) : (
        <ul>
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <span
                onClick={() => toggleComplete(task.id)}
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
              >
                {task.text}
              </span>
              <span className="category-tag">{task.category}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;