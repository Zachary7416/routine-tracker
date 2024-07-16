// src/components/TodoCard.tsx
import React from 'react';
import { Todo } from '../types';

interface TodoCardProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, toggleTodo }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="mr-2"
      />
      <span
        className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
      >
        {todo.task}
      </span>
    </div>
  );
};

export default TodoCard;
