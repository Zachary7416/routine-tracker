import React from 'react';
import { Stage, STAGES, Todo, getTodosDateKey } from '../types';
import Navi from '../components/Navi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SummaryProps {
  setStage: (stage: Stage) => void;
}

const Summary: React.FC<SummaryProps> = ({ setStage }) => {
  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    const currentDay = today.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - currentDay)
    );
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);
      dates.push(getTodosDateKey(date));
    }
    return dates;
  };

  const fetchWeeklyTodos = () => {
    const weekDates = getWeekDates();
    const weeklyTodos: { [date: string]: Todo[] } = {};

    weekDates.forEach(dateKey => {
      const storedTodos = localStorage.getItem(dateKey);
      if (storedTodos) {
        weeklyTodos[dateKey] = JSON.parse(storedTodos) as Todo[];
      }
    });

    return weeklyTodos;
  };

  const generateMarkdownSummary = () => {
    const weeklyTodos = fetchWeeklyTodos();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = getWeekDates();

    // Initialize the table with the header row
    let markdown =
      weekDays.join(' | ') +
      ' |\n' +
      weekDays.map(() => ':---:').join(' | ') +
      ' |\n';

    // Gather todos for each day
    const todosByDay: string[][] = weekDays.map(() => []);

    dates.forEach((dateKey, index) => {
      const todos = weeklyTodos[dateKey] || [];
      todos.forEach(todo => {
        const todoTask =
          todo.task.length > 20 ? todo.task.slice(0, 20) + '...' : todo.task;
        const todoEntry = !todo.completed
          ? `**${todoTask}**`
          : `~*${todoTask}*~`;
        todosByDay[index].push(todoEntry);
      });
    });

    // Fill table rows with todos for each day
    const maxRows = Math.max(...todosByDay.map(todos => todos.length));
    for (let i = 0; i < maxRows; i++) {
      markdown += '| ';
      weekDays.forEach((_, index) => {
        markdown += (todosByDay[index][i] || ' ') + ' | ';
      });
      markdown += '\n';
    }

    return markdown;
  };

  const saveSummary = () => {
    const summary = generateMarkdownSummary();
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const blob = new Blob([summary], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `summary-${date}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copySummaryToClipboard = () => {
    const summary = generateMarkdownSummary();
    navigator.clipboard.writeText(summary).then(
      () => {
        alert('Summary copied to clipboard!');
      },
      err => {
        alert('Failed to copy summary: ' + err);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Weekly Summary</h1>
      <Navi currentStage={Stage.REVIEW} stages={STAGES} setStage={setStage} />
      <div className="w-full max-w-3xl mt-4 bg-white p-6 shadow-lg rounded-lg flex-col">
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose mx-auto">
          {generateMarkdownSummary()}
        </ReactMarkdown>
        <div className="flex justify-between mt-4">
          <button
            onClick={saveSummary}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save Summary
          </button>
          <button
            onClick={copySummaryToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
