// src/components/Summary.tsx
import React from 'react';
import { Todo } from '../types';

interface SummaryProps {
  todos: Todo[];
}

const Summary: React.FC<SummaryProps> = ({ todos }) => {
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-2">Weekly Summary</h2>
      <p>
        You have completed {completedCount} out of {totalCount} tasks this week.
      </p>
    </div>
  );
};

export default Summary;
