function TaskForm({ taskText, setTaskText, category, setCategory, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
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
  );
}

export default TaskForm;