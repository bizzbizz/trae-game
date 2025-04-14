import React from 'react';
import { ResourceBoxProps } from './GameBox.tsx';

export interface GameButtonProps {
  emoji: string;
  tooltip: string;
  onClick?: () => void;
  Box?: React.FC<ResourceBoxProps>;
}

export const GameButton: React.FC<GameButtonProps> = ({ emoji, tooltip, onClick }) => {
  return (
    <button
      className="game-button"
      onClick={onClick}
      title={tooltip}
    >
      <span>{emoji}</span>
    </button>
  );
};