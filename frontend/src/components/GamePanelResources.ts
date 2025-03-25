import { GamePanel, GameButton, GamePopup, DEFAULT_BUTTON_SIZE } from '../types/ui';
import { Resource } from '../types/economy';

export class GamePopupResources implements GamePopup {
  buttons: GameButton[] = [];
  onClose: () => void;

  constructor(onClose: () => void) {
    this.onClose = onClose;
  }
}

export class GamePanelResources implements GamePanel {
  buttons: GameButton[] = [];

  constructor(resources: Resource[]) {
    this.buttons = resources.map(resource => ({
      emoji: resource.Icon,
      tooltip: resource.ResourceId,
      size: DEFAULT_BUTTON_SIZE,
      popup: new GamePopupResources(() => {
        // Close popup implementation
      }),
    }));
  }
}
