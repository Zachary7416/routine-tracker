// src/layout/CheckList.tsx
import React, { useState, useEffect } from 'react';
import {
  Stage,
  STAGES,
  Todo,
  getTodosDateKey,
  todosTemplateKey,
  sameTodoType,
} from '../types';
import Navi from '../components/Navi';
import TodoCard from '../components/TodoCard';
import _ from 'lodash';

interface CheckListProps {
  setStage: (stage: Stage) => void;
}

const CheckList: React.FC<CheckListProps> = ({ setStage }) => {
  const getDateKey = () => {
    return getTodosDateKey(new Date());
  };

  const getTodosTemplate = () => {
    const storedTodos = localStorage.getItem(todosTemplateKey);
    if (storedTodos) {
      return JSON.parse(storedTodos) as Todo[];
    } else {
      return null;
    }
  };

  const getTodosDate = () => {
    const dateKey = getDateKey();
    const storedTodos = localStorage.getItem(dateKey);
    if (storedTodos) {
      return JSON.parse(storedTodos) as Todo[];
    } else {
      return null;
    }
  };

  const getTodosToday = () => {
    const todosDate = getTodosDate();
    const todosTemplate = getTodosTemplate();
    if (!todosDate) {
      return todosTemplate || ([] as Todo[]);
    } else if (!todosTemplate) {
      return todosDate;
    }

    if (
      todosDate.length === todosTemplate.length &&
      _.zipWith(todosDate, todosTemplate, sameTodoType).every(same => same)
    ) {
      return todosDate;
    }
    return todosTemplate.map(templateTodo => {
      const dateTodo = todosDate.find(
        dateTodo => dateTodo.id === templateTodo.id
      );
      if (dateTodo) {
        return dateTodo;
      } else {
        return templateTodo;
      }
    });
  };

  const [todos, setTodos] = useState<Todo[]>(getTodosToday());

  useEffect(() => {
    const dateKey = getDateKey();
    localStorage.setItem(dateKey, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos(getTodosToday());
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Daily Checklist
      </h1>
      <Navi
        currentStage={Stage.CHECKLIST}
        stages={STAGES}
        setStage={setStage}
      />
      <div className="w-full max-w-3xl mt-4">
        {todos.length === 0 ? (
          <p className="text-gray-600">No tasks for today. Enjoy your day!</p>
        ) : (
          todos.map((todo, index) => (
            <TodoCard
              key={todo.id}
              title={`${index + 1}. `}
              todo={todo}
              toggleTodo={toggleTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CheckList;
