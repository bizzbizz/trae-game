import { Resource } from '../types/economy';
import { GameButton } from './GameButton';

export class GamePopup {
  buttons: GameButton[] = [];
  isOpen: boolean = false;
  static ActivePopup: GamePopup | undefined;

  Open() {
    this.isOpen = true;
    GamePopup.ActivePopup = this;
  }
  Close() {
    this.isOpen = false;
    GamePopup.ActivePopup = undefined;
  }
}

export class GamePopupResources extends GamePopup {
  focusedResource: Resource;

  constructor(focusedResource: Resource) {
    super();
    this.focusedResource = focusedResource;
  }
}
