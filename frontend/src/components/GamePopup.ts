import { Resource } from '../types/economy';
import { GameButton } from './GameButton';

export let ActivePopup: GamePopup | undefined;

export class GamePopup {
  buttons: GameButton[] = [];
  isOpen: boolean = false;
  Open() {
    this.isOpen = true;
    ActivePopup = this;
  }
  Close() {
    this.isOpen = false;
    ActivePopup = undefined;
  }
}

export class GamePopupResources extends GamePopup {
  focusedResource: Resource;

  constructor(focusedResource: Resource) {
    super();
    this.focusedResource = focusedResource;
  }
}
