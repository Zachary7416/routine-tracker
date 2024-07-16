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
      {todos.map(todo => (
        <TodoCard key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};

export default TodoList;
