import { World } from '../types/world';
import { GameButton } from './GameButton';
import { GamePopupResources } from './GamePopup';

export interface GamePanel {
  buttons: GameButton[];
}

export class GamePanelResources implements GamePanel {
  buttons: GameButton[] = [];
  private panel: HTMLDivElement;

  private refreshPanel(world: World | null) {
    if (world && world.Economy && world.Economy.Resources) {
      this.buttons = world.Economy.Resources.map(resource => ({
        emoji: resource.Icon,
        tooltip: resource.ResourceId,
        popup: new GamePopupResources(resource),
      }));
    }
  }

  constructor(world: World | null) {
    this.refreshPanel(world);

    // Create the panel
    this.panel = document.createElement('div');
    this.panel.className = 'resources-panel';
    document.body.appendChild(this.panel);
  }

  render(world: World | null): void {
    this.refreshPanel(world);

    // Clear existing content
    this.panel.innerHTML = '';

    // Create resource display
    const resourceList = document.createElement('div');
    resourceList.className = 'resources-list';

    this.buttons.forEach(resource => {
      const resourceElement = document.createElement('button');
      resourceElement.className = 'resource-item';
      resourceElement.onclick = () => {
        resource.popup?.Open();
      };

      const icon = document.createElement('span');
      icon.textContent = resource.emoji;

      resourceElement.appendChild(icon);
      resourceList.appendChild(resourceElement);
    });

    this.panel.appendChild(resourceList);
  }
}
