import { Territory, World, Zone } from './types/world';
import { GamePanelResources } from './components/GamePanel';
import { GamePopup, GamePopupResources } from './components/GamePopup';

interface PopupConfig {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface RenderStyles {
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  font: string;
  textAlign: CanvasTextAlign;
}

class GameRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private territoryColors: Map<string, string>;
  private resourcePanel: GamePanelResources;
  private readonly defaultPopupConfig: PopupConfig = {
    width: 300,
    height: 200,
    x: 0,
    y: 0
  };
  private readonly defaultStyles: RenderStyles = {
    fillStyle: '#333',
    strokeStyle: '#333',
    lineWidth: 2,
    font: '14px Arial',
    textAlign: 'center'
  };

  constructor(world: World, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.territoryColors = new Map();
    this.resourcePanel = new GamePanelResources(world);
  }

  private renderPopup(world: World): void {
    if (!GamePopup.ActivePopup?.isOpen) return;

    const config: PopupConfig = {
      ...this.defaultPopupConfig,
      x: (this.canvas.width - this.defaultPopupConfig.width) / 2,
      y: (this.canvas.height - this.defaultPopupConfig.height) / 2
    };

    // Create overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw popup background
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(config.x, config.y, config.width, config.height);
    this.ctx.strokeStyle = this.defaultStyles.strokeStyle;
    this.ctx.lineWidth = this.defaultStyles.lineWidth;
    this.ctx.strokeRect(config.x, config.y, config.width, config.height);

    // Draw close button
    this.ctx.fillStyle = this.defaultStyles.fillStyle;
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'right';
    this.ctx.fillText('×', config.x + config.width - 10, config.y + 25);

    // Draw popup content
    if (GamePopup.ActivePopup instanceof GamePopupResources) {
      const resource = GamePopup.ActivePopup.focusedResource;
      this.ctx.fillStyle = this.defaultStyles.fillStyle;
      this.ctx.font = '16px Arial';
      this.ctx.textAlign = this.defaultStyles.textAlign;
      this.ctx.fillText(`${resource.Icon} ${resource.ResourceId}`, config.x + config.width/2, config.y + 50);
    }
  }

  private renderTerritory(world: World): void {
    if (!world?.WorldMap?.Territories) return;

    Object.values(world.WorldMap.Territories).forEach((territory: Territory) => {
      if (!this.territoryColors.has(territory.TerritoryId)) {
        const hue = Math.random() * 360;
        this.territoryColors.set(territory.TerritoryId, `hsla(${hue}, 70%, 80%, 0.3)`);
      }
      this.ctx.fillStyle = this.territoryColors.get(territory.TerritoryId) || '';

      territory.Zones?.forEach((zoneId: string) => {
        const zone = world.WorldMap.Zones.find(z => z.ZoneId === zoneId);
        if (zone) {
          this.ctx.fillRect(zone.X, zone.Y, zone.Width, zone.Height);
        }
      });
    });
  }

  private renderZones(world: World): void {
    if (!world?.WorldMap?.Zones) return;

    Object.values(world.WorldMap.Zones).forEach((zone: Zone) => {
      const gradient = this.ctx.createLinearGradient(zone.X, zone.Y, zone.X + zone.Width, zone.Y + zone.Height);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(zone.X, zone.Y, zone.Width, zone.Height);

      // Draw zone border
      this.ctx.strokeStyle = this.defaultStyles.strokeStyle;
      this.ctx.lineWidth = this.defaultStyles.lineWidth;
      this.ctx.strokeRect(zone.X, zone.Y, zone.Width, zone.Height);

      // Draw zone name
      this.ctx.fillStyle = this.defaultStyles.fillStyle;
      this.ctx.font = this.defaultStyles.font;
      this.ctx.textAlign = this.defaultStyles.textAlign;
      this.ctx.fillText(zone.Name, zone.X + zone.Width / 2, zone.Y + zone.Height / 2);
    });
  }

  render(world: World): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.resourcePanel.render(world);
    this.renderPopup(world);
    this.renderTerritory(world);
    this.renderZones(world);
  }

  isPointInZone(x: number, y: number, zone: Zone): boolean {
    if (!zone) return false;
    
    const { X, Y, Width, Height } = zone;
    if (typeof X !== 'number' || typeof Y !== 'number' || 
        typeof Width !== 'number' || typeof Height !== 'number') {
      return false;
    }
    
    return x >= X && x <= X + Width && y >= Y && y <= Y + Height;
  }

  private applyCanvasStyle(style: Partial<RenderStyles>): void {
    Object.entries(style).forEach(([key, value]) => {
      if (value !== undefined && key in this.ctx) {
        (this.ctx as any)[key] = value;
      }
    });
  }
}

export default GameRenderer;
