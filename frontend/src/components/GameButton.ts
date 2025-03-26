import * as ui from './GamePopup';

export interface GameButton {
  emoji: string;
  tooltip: string;
  popup?: ui.GamePopup;
  onClick?: () => void;
  size?: {
    width: number;
    height: number;
  };
}

// Default button size constants
export const DEFAULT_BUTTON_SIZE = {
  width: 32,
  height: 32,
};

// Tooltip delay in seconds
export const TOOLTIP_DELAY = 0.3;
