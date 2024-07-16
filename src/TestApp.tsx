import React from 'react';
import { useState } from 'react';
import { Stage } from './types';
import Home from './layouts/Home';
import Designation from './layouts/Designation';
import CheckList from './layouts/CheckList';
import Summary from './layouts/Summary';
import './index.css';

// Conditional rendering based on stage.
const TestApp: React.FC = () => {
  const [stage, setStage] = useState<Stage>(Stage.HOME);

  const renderStage = () => {
    switch (stage) {
      case Stage.HOME:
        return <Home setStage={setStage} />;
      case Stage.DESIGNATION:
        return <Designation designation="Manager" />;
      case Stage.CHECKLIST:
        return <CheckList />;
      case Stage.REVIEW:
        return <Summary />;

      default:
        return <div>Invalid stage</div>;
    }
  };

  return <div>{renderStage()}</div>;
};

export default TestApp;
