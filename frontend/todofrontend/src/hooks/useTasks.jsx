import { useState, useEffect } from "react";

const API_URL = "https://todobackend-h9se.onrender.com";  // FastAPI endpoint

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    fetchTasks();
  }, [darkMode]);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load tasks. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new task to the API
  const addTask = async () => {
    if (!newTask.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTask.trim(),
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      setNewTask("");
      await fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Add error:", error);
      setError("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle the completion status of a task
  const toggleComplete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const task = tasks.find((t) => t.id === id);
      const response = await fetch(`${API_URL}${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: task.text,
          completed: !task.completed,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      await fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Toggle error:", error);
      setError("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a task from the API
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      await fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Start editing a task
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  // Save the edited task
  const saveTask = async (id) => {
    if (!editText.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: editText.trim(),
          completed: tasks.find((t) => t.id === id).completed,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      setEditingId(null);
      setEditText("");
      await fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Edit error:", error);
      setError("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks based on their completion status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return {
    tasks,
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
  };
};
