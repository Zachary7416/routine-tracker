// layout/Home.tsx
import React from 'react';
import { Stage, STAGES } from '../types';
import Navi from '../components/Navi';
import ReactMarkdown from 'react-markdown';

interface HomeProps {
  setStage: (stage: Stage) => void;
}

const Home: React.FC<HomeProps> = ({ setStage }) => {
  const markdownContent = `
  ## Introduction

  Welcome to **RoutineTracker**, your personal app to manage daily routines efficiently. Here, you can:

  - Design your routine
  - Check off completed tasks
  - Review your progress weekly

  Navigate through different sections using the buttons above.
  `;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Welcome to RoutineTracker!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        This is the home page. Navigate through different sections using the
        buttons below.
      </p>
      <Navi currentStage={Stage.HOME} stages={STAGES} setStage={setStage} />
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-3xl">
        <ReactMarkdown className="prose">{markdownContent}</ReactMarkdown>
      </div>
      <footer className="mt-auto py-4 text-gray-600">
        &copy; {new Date().getFullYear()} RoutineTracker. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
