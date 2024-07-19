// TestApp.tsx

import React from 'react';
import { useState, useEffect } from 'react';
import { Stage } from './types';
import Home from './layouts/Home';
import Designation from './layouts/Designation';
import CheckList from './layouts/CheckList';
import Summary from './layouts/Summary';
import './index.css';

// Conditional rendering based on stage.
const App: React.FC = () => {
  const getStage = () => {
    // get stage from local storage or default to HOME
    const storedStage = localStorage.getItem('stage');
    if (storedStage) {
      return storedStage as Stage;
    }
    return Stage.HOME;
  };

  const [stage, setStage] = useState<Stage>(getStage());

  useEffect(() => {
    // save stage to local storage
    localStorage.setItem('stage', stage);
  }, [stage]);

  const renderStage = () => {
    switch (stage) {
      case Stage.HOME:
        return <Home setStage={setStage} />;
      case Stage.DESIGNATION:
        return <Designation setStage={setStage} />;
      case Stage.CHECKLIST:
        return <CheckList setStage={setStage} />;
      case Stage.REVIEW:
        return <Summary setStage={setStage} />;

      default:
        return <div>Invalid stage</div>;
    }
  };

  return <div>{renderStage()}</div>;
};

export default App;
