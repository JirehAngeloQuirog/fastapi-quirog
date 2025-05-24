import "./App.css";
import { useTasks } from "/src/hooks/useTasks";
import TaskItem from "/src/components/TaskItem";

function App() {
  const {
    newTask,
    setNewTask,
    filter,
    setFilter,
    darkMode,
    setDarkMode,
    error,
    loading,
    editingId,
    editText,
    setEditText,
    filteredTasks,
    addTask,
    toggleComplete,
    deleteTask,
    startEditing,
    cancelEditing,
    saveTask,
  } = useTasks();

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      <h1>Enhanced To-Do List</h1>

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      <div className="controls">
        <button 
          className="toggle-mode" 
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            disabled={loading}
          />
          <button onClick={addTask} disabled={loading}>
            Add
          </button>
        </div>

        <div className="filters">
          <button 
            onClick={() => setFilter("all")} 
            className={filter === "all" ? "active" : ""}
          >
            All
          </button>
          <button 
            onClick={() => setFilter("pending")} 
            className={filter === "pending" ? "active" : ""}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter("completed")} 
            className={filter === "completed" ? "active" : ""}
          >
            Completed
          </button>
        </div>
      </div>

      <ul>
        {filteredTasks.length === 0 ? (
          <li className="empty">No tasks found</li>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              loading={loading}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              toggleComplete={toggleComplete}
              startEditing={startEditing}
              cancelEditing={cancelEditing}
              saveTask={saveTask}
              deleteTask={deleteTask}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default App;