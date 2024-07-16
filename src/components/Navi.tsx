// src/components/Navi.tsx
import React from 'react';
import { Stage } from '../types';

interface NaviProps {
  currentStage: Stage;
  stages: Stage[];
  setStage: (stage: Stage) => void;
}

const Navi: React.FC<NaviProps> = ({ currentStage, stages, setStage }) => {
  return (
    <nav className="bg-green-100 p-4 rounded-lg shadow-md mb-4 w-full max-w-3xl mx-auto">
      <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
        {stages.map(stage => (
          <li key={stage} className="w-full sm:w-auto">
            <button
              onClick={() => setStage(stage)}
              className={`px-4 py-2 rounded-md w-full sm:w-auto transition duration-200 ${
                currentStage === stage
                  ? 'bg-green-600 text-white'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {stage}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navi;
