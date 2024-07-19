// src/types.ts
export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

// Compare two todos by their id and task to determine if they are in the same type
export const sameTodoType = (a: Todo, b: Todo) => a.task === b.task;

// Stages of the page
export enum Stage {
  HOME = 'Home',
  DESIGNATION = 'Designation',
  CHECKLIST = 'Checklist',
  REVIEW = 'Review',
}

export const STAGES = [
  Stage.HOME,
  Stage.DESIGNATION,
  Stage.CHECKLIST,
  Stage.REVIEW,
];

export const todosTemplateKey = 'todos-template';

// Get the key of the todos for a given date, e.g. 'todos-2021-09-10'
// The format of the date is YYYY-MM-DD.
// This is used to store the todos in local storage.
export const getTodosDateKey = (date: Date) =>
  `todos-${date.toLocaleDateString('en-US', {})}`;
