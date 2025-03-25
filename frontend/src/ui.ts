import * as ui from './types/ui';
import { world } from './game';

export interface GamePopup {
    buttons: ui.GameButton[]
    onClose: () => void
}

export class GamePopupResources implements ui.GamePopup {
    buttons: ui.GameButton[] = [];
    onClose: () => void;

    constructor(onClose: () => void) {
        this.onClose = onClose;
    }
}

export class GamePanelResources implements ui.GamePanel {
    buttons: ui.GameButton[] = [];
    private panel: HTMLDivElement;

    constructor() {
        if (world.Economy && world.Economy.Resources) {
            this.buttons = world.Economy.Resources.map(resource => ({
                emoji: resource.Icon,
                tooltip: resource.ResourceId,
                popup: new GamePopupResources(() => {
                    // Close popup implementation
                })
            }));
        }

        // Create and style the panel
        this.panel = document.createElement('div');
        this.panel.style.position = 'fixed';
        this.panel.style.top = '0';
        this.panel.style.left = '0';
        this.panel.style.width = '100%';
        this.panel.style.padding = '10px';
        this.panel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        this.panel.style.color = 'white';
        document.body.appendChild(this.panel);
    }

    render(): void {
        if (!world.Economy || !world.Economy.Resources) return;

        // Clear existing content
        this.panel.innerHTML = '';

        // Create resource display
        const resourceList = document.createElement('div');
        resourceList.style.display = 'flex';
        resourceList.style.gap = '20px';
        resourceList.style.justifyContent = 'center';

        world.Economy.Resources.forEach(resource => {
            const resourceElement = document.createElement('div');
            resourceElement.style.display = 'flex';
            resourceElement.style.alignItems = 'center';
            resourceElement.style.gap = '5px';
            
            const icon = document.createElement('span');
            icon.textContent = resource.Icon;
            
            resourceElement.appendChild(icon);
            resourceList.appendChild(resourceElement);
        });

        this.panel.appendChild(resourceList);
    }
}