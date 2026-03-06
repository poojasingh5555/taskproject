import { useState, useEffect } from "react";
import { createTask, getTasks, updateTask, deleteTask } from "../services/api.js";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null); // track task being updated
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAllTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  // CREATE Task
  const handleCreate = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!title) return setError("Title is required");

    try {
      await createTask({ title, description });
      setSuccess("Task created successfully");
      setTitle(""); setDescription("");
      fetchAllTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating task");
    }
  };

  // Start Editing Task
  const startEditing = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // CANCEL Editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // UPDATE Task
  const handleUpdate = async () => {
    if (!editTitle) return setError("Title cannot be empty");
    try {
      await updateTask(editingId, { title: editTitle, description: editDescription });
      setSuccess("Task updated successfully");
      cancelEditing();
      fetchAllTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Error updating task");
    }
  };

  // DELETE Task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setSuccess("Task deleted successfully");
      fetchAllTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Task Form */}
      <form onSubmit={handleCreate} className="mb-6">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-4 mb-2">
            {editingId === task._id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-1 w-full"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border p-1 w-full"
                />
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white p-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-400 text-white p-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(task)}
                    className="bg-yellow-400 p-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 p-1 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}