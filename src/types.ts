// src/types.ts
export interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

// Stages of the page
export enum Stage {
  HOME = 'Home',
  DESIGNATION = 'Designation',
  CHECKLIST = 'Checklist',
  REVIEW = 'Review',
}

export const STAGES = [
  Stage.HOME,
  Stage.CHECKLIST,
  Stage.DESIGNATION,
  Stage.REVIEW,
];
