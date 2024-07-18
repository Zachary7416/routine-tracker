// src/components/TodoForm.tsx
import React, { useState } from 'react';
import { Todo } from '../types';

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      task,
      completed: false,
    };
    addTodo(newTodo);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center">
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        className="border p-2 mr-2 flex-1"
        placeholder="Add a new task"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
