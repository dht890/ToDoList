import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await updateTask(taskId, updates);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const toggleTaskComplete = async (task) => {
    await handleUpdateTask(task.id, { completed: !task.completed });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="user-info">
          <h1>Welcome, {user?.username}!</h1>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="task-form-section">
          <h2>Add New Task</h2>
          <form onSubmit={handleCreateTask} className="task-form">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="task-input"
              required
            />
            <textarea
              placeholder="Task description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="task-textarea"
            />
            <button type="submit" className="add-task-btn">Add Task</button>
          </form>
        </section>

        <section className="tasks-section">
          <h2>Your Tasks ({tasks.length})</h2>
          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet. Create your first task above!</p>
          ) : (
            <div className="tasks-list">
              {tasks.map((task) => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  {editingTask?.id === task.id ? (
                    <div className="task-edit-form">
                      <input
                        type="text"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        className="task-input"
                      />
                      <textarea
                        value={editingTask.description || ''}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        className="task-textarea"
                      />
                      <div className="task-actions">
                        <button 
                          onClick={() => handleUpdateTask(task.id, editingTask)}
                          className="save-btn"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingTask(null)}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="task-content">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskComplete(task)}
                          className="task-checkbox"
                        />
                        <div className="task-details">
                          <h3 className={task.completed ? 'completed-text' : ''}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className={task.completed ? 'completed-text' : ''}>
                              {task.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="task-actions">
                        <button 
                          onClick={() => setEditingTask(task)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 