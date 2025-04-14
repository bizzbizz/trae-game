import React from 'react';
import { World } from './types/world';

interface AppProps {
  world: World | null;
}

const App: React.FC<AppProps> = ({ world }) => {
  return (
    <div className="game-container">
      <div className="game-state-tree">
        <div className="tabs">
          <button className="tab active" data-tab="gameState">Game State</button>
          <button className="tab" data-tab="gameMechanics">Game Mechanics</button>
        </div>
        <div id="treeContent"></div>
      </div>
      <canvas id="gameCanvas" width={800} height={600}></canvas>
      <button className="next-turn-button" id="nextTurnButton">
        Next<br />Turn
      </button>
    </div>
  );
};

export default App;