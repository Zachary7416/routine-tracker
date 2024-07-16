// src/components/TodoCard.tsx
import React from 'react';
import { Todo } from '../types';

interface TodoCardProps {
  title: string;
  todo: Todo;
  toggleTodo: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ title, todo, toggleTodo }) => {
  return (
    <div className="bg-green-50 shadow-lg rounded-lg p-4 mb-4 flex items-center">
      <span
        className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-green-800'}`}
      >
        <span className="font-bold">{title}</span>
        {todo.task}
      </span>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="form-checkbox h-5 w-5 text-green-600 rounded-md ml-3 focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
};

export default TodoCard;
