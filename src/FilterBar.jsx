function FilterBar({ filter, setFilter, remainingCount }) {
  return (
    <div className="filters">
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('active')}>Active</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <p>{remainingCount} task(s) remaining</p>
    </div>
  );
}

export default FilterBar;