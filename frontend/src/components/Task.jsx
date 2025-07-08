import React, { useEffect, useState } from 'react';
import api from "../api.js";
import AddTaskForm from './addTaskForm.jsx';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const addTask = async (taskName) => {
    try {
      await api.post('/tasks', { name: taskName });
      fetchTasks();  // Refresh the list after adding a task
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks List</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
      <AddTaskForm addTask={addTask} />
    </div>
  );
};

export default TaskList;