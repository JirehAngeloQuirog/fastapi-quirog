import React from "react";

const TaskItem = ({
  task,
  loading,
  editingId,
  editText,
  setEditText,
  toggleComplete,
  startEditing,
  cancelEditing,
  saveTask,
  deleteTask,
}) => {
  return (
    <li key={task.id} className={task.completed ? "completed" : ""}>
      {editingId === task.id ? (
        <div className="edit-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <div className="edit-buttons">
            <button onClick={() => saveTask(task.id)}>Save</button>
            <button onClick={cancelEditing}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              disabled={loading}
            />
            <span onClick={() => toggleComplete(task.id)}>
              {task.text}
            </span>
          </div>
          <div className="task-actions">
            <button 
              onClick={() => startEditing(task.id, task.text)}
              disabled={loading}
            >
              Edit
            </button>
            <button 
              onClick={() => deleteTask(task.id)}
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;