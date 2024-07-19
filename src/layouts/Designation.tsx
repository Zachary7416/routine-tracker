import React, { useState, useEffect } from 'react';
import { sameTodoType, Stage, STAGES, todosTemplateKey } from '../types';
import TodoForm from '../components/TodoForm';
import TodoCard from '../components/TodoCard';
import { Todo } from '../types';
import Navi from '../components/Navi';

interface DesignationProps {
  setStage: (stage: Stage) => void;
}

const Designation: React.FC<DesignationProps> = ({ setStage }) => {
  const getTodos = () => {
    return JSON.parse(localStorage.getItem(todosTemplateKey) || '[]') as Todo[];
  };

  const [todos, setTodos] = useState<Todo[]>(getTodos());
  const [history, setHistory] = useState<Todo[][]>([]);
  const [redoHistory, setRedoHistory] = useState<Todo[][]>([]);

  useEffect(() => {
    localStorage.setItem(todosTemplateKey, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    if (todos.some(t => sameTodoType(t, todo))) {
      alert('You have already added a todo of this type.');
      return;
    }
    setHistory([...history, todos]);
    setTodos([...todos, todo]);
    setRedoHistory([]);
  };

  const toggleTodo = (id: number) => {
    setHistory([...history, todos]);
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    setRedoHistory([]);
  };

  const deleteTodo = (id: number) => {
    setHistory([...history, todos]);
    setTodos(todos.filter(todo => todo.id !== id));
    setRedoHistory([]);
  };

  const moveTodoUp = (id: number) => {
    setHistory([...history, todos]);
    const index = todos.findIndex(todo => todo.id === id);
    if (index > 0) {
      const newTodos = [...todos];
      [newTodos[index - 1], newTodos[index]] = [
        newTodos[index],
        newTodos[index - 1],
      ];
      setTodos(newTodos);
    }
    setRedoHistory([]);
  };

  const moveTodoDown = (id: number) => {
    setHistory([...history, todos]);
    const index = todos.findIndex(todo => todo.id === id);
    if (index < todos.length - 1) {
      const newTodos = [...todos];
      [newTodos[index + 1], newTodos[index]] = [
        newTodos[index],
        newTodos[index + 1],
      ];
      setTodos(newTodos);
    }
    setRedoHistory([]);
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setRedoHistory([todos, ...redoHistory]);
      setTodos(previousState);
      setHistory(history.slice(0, history.length - 1));
    }
  };

  const redo = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory[0];
      setHistory([...history, todos]);
      setTodos(nextState);
      setRedoHistory(redoHistory.slice(1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Design Your Routine
      </h1>
      <Navi
        currentStage={Stage.DESIGNATION}
        setStage={setStage}
        stages={STAGES}
      />
      <TodoForm addTodo={addTodo} />
      <div className="w-full max-w-3xl">
        {todos.map((todo, index) => (
          <TodoCard
            key={todo.id}
            title={`${index + 1}. `}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            moveTodoUp={moveTodoUp}
            moveTodoDown={moveTodoDown}
            designMode={true}
            showMoveDown={index < todos.length - 1}
            showMoveUp={index > 0}
          />
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={undo}
          className="text-yellow-500 bg-none border-none p-2 rounded mr-2 hover:bg-gray-200"
          disabled={history.length === 0}
        >
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                d="M4 7H15C16.8692 7 17.8039 7 18.5 7.40193C18.9561 7.66523 19.3348 8.04394 19.5981 8.49999C20 9.19615 20 10.1308 20 12C20 13.8692 20 14.8038 19.5981 15.5C19.3348 15.9561 18.9561 16.3348 18.5 16.5981C17.8039 17 16.8692 17 15 17H8.00001M4 7L7 4M4 7L7 10"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{' '}
            </g>
          </svg>
        </button>
        <button
          onClick={redo}
          className="text-green-500 bg-none border-none p-2 rounded hover:bg-gray-200"
          disabled={redoHistory.length === 0}
        >
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                d="M20 7H9.00001C7.13077 7 6.19615 7 5.5 7.40193C5.04395 7.66523 4.66524 8.04394 4.40193 8.49999C4 9.19615 4 10.1308 4 12C4 13.8692 4 14.8038 4.40192 15.5C4.66523 15.9561 5.04394 16.3348 5.5 16.5981C6.19615 17 7.13077 17 9 17H16M20 7L17 4M20 7L17 10"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{' '}
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Designation;
