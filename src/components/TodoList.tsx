// src/components/TodoList.tsx
import React from 'react';
import TodoCard from './TodoCard';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoCard
          key={todo.id}
          title={`${index + 1}. `}
          todo={todo}
          toggleTodo={() => toggleTodo(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
