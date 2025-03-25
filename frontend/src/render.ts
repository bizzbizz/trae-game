import { Territory, World, Zone } from "./types/world";
import { GamePanelResources } from "./ui";

class GameRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private territoryColors: Map<string, string>;
    private resourcePanel: GamePanelResources;

    constructor(world: World, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.territoryColors = new Map();
        this.resourcePanel = new GamePanelResources(world);
    }

    render(world: World): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.resourcePanel.render(world);

        // Draw territories first (as background)
        if (world && world.WorldMap && world.WorldMap.Territories) {
            Object.values(world.WorldMap.Territories).forEach((territory: Territory) => {
                // Get or generate a consistent color for each territory
                if (!this.territoryColors.has(territory.TerritoryId)) {
                    const hue = Math.random() * 360;
                    this.territoryColors.set(territory.TerritoryId, `hsla(${hue}, 70%, 80%, 0.3)`);
                }
                this.ctx.fillStyle = this.territoryColors.get(territory.TerritoryId) || '';
                
                territory.Zones?.forEach((zoneId: string) => {
                    const zone = world.WorldMap.Zones[0];
                    if (zone && zone.X !== undefined && zone.Y !== undefined && 
                        zone.Width !== undefined && zone.Height !== undefined) {
                        this.ctx.fillRect(zone.X, zone.Y, zone.Width, zone.Height);
                    }
                });
            });
        }

        // Draw individual zones with borders and gradient background
        if (world && world.WorldMap && world.WorldMap.Zones) {
            Object.values(world.WorldMap.Zones).forEach((zone: Zone) => {
                if (zone.X !== undefined && zone.Y !== undefined && 
                    zone.Width !== undefined && zone.Height !== undefined) {
                    // Create gradient background for zones
                    const gradient = this.ctx.createLinearGradient(
                        zone.X, zone.Y, 
                        zone.X + zone.Width, zone.Y + zone.Height
                    );
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
                    
                    this.ctx.fillStyle = gradient;
                    this.ctx.fillRect(zone.X, zone.Y, zone.Width, zone.Height);
                    
                    // Draw zone border
                    this.ctx.strokeStyle = '#333';
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(zone.X, zone.Y, zone.Width, zone.Height);
                    
                    // Draw zone name
                    this.ctx.fillStyle = '#000';
                    this.ctx.font = '14px Arial';
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(
                        zone.Name, 
                        zone.X + zone.Width / 2,
                        zone.Y + zone.Height / 2
                    );
                }
            });
        }
    }

    isPointInZone(x: number, y: number, zone: Zone): boolean {
        return zone.X !== undefined && zone.Y !== undefined && 
               zone.Width !== undefined && zone.Height !== undefined && 
               x >= zone.X && x <= zone.X + zone.Width &&
               y >= zone.Y && y <= zone.Y + zone.Height;
    }
}

export default GameRenderer;