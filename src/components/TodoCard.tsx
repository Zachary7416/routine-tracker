// src/components/TodoCard.tsx
import React from 'react';
import { Todo } from '../types';

interface TodoCardProps {
  title: string;
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo?: (id: number) => void;
  moveTodoUp?: (id: number) => void;
  moveTodoDown?: (id: number) => void;
  designMode?: boolean;
  showMoveUp?: boolean;
  showMoveDown?: boolean;
}

const TodoCard: React.FC<TodoCardProps> = ({
  title,
  todo,
  toggleTodo,
  deleteTodo,
  moveTodoUp,
  moveTodoDown,
  designMode = false,
  showMoveUp = true,
  showMoveDown = true,
}) => {
  return (
    <div className="bg-green-50 shadow-lg rounded-lg p-4 mb-4 flex items-center">
      <span
        className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-green-800'}`}
      >
        <span className="font-bold">{title} </span>
        {todo.task}
      </span>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        disabled={designMode}
        className="form-checkbox h-5 w-5 text-green-600 rounded-md ml-3 focus:ring-2 focus:ring-green-400"
      />
      {designMode && (
        <div className="ml-4 flex space-x-2">
          {showMoveUp && (
            <button
              onClick={() => moveTodoUp?.(todo.id)}
              className="text-xl text-blue-500 hover:text-blue-600 focus:outline-none border-none bg-none"
              title="Move Up"
            >
              ▲
            </button>
          )}

          {showMoveDown && (
            <button
              onClick={() => moveTodoDown?.(todo.id)}
              className="text-xl text-blue-500 hover:text-blue-600 focus:outline-none border-none bg-none"
              title="Move Down"
            >
              ▼
            </button>
          )}

          <button
            onClick={() => deleteTodo?.(todo.id)}
            className="text-xl text-red-500 hover:text-red-600 focus:outline-none border-none bg-none"
            title="Delete"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
