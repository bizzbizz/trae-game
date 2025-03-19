class GameRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        // Store territory colors to keep them consistent
        this.territoryColors = new Map();
    }

    render(gameState) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw territories first (as background)
        if (gameState.world && gameState.world.territories) {
            Object.values(gameState.world.territories).forEach(territory => {
                // Get or generate a consistent color for each territory
                if (!this.territoryColors.has(territory.id)) {
                    const hue = Math.random() * 360;
                    this.territoryColors.set(territory.id, `hsla(${hue}, 70%, 80%, 0.3)`);
                }
                this.ctx.fillStyle = this.territoryColors.get(territory.id);
                
                territory.zones.forEach(zoneId => {
                    const zone = gameState.world.zones[zoneId];
                    if (zone) {
                        this.ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
                    }
                });
            });
        }

        // Draw individual zones with borders and gradient background
        if (gameState.world && gameState.world.zones) {
            Object.values(gameState.world.zones).forEach(zone => {
                // Create gradient background for zones
                const gradient = this.ctx.createLinearGradient(
                    zone.x, zone.y, 
                    zone.x + zone.width, zone.y + zone.height
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
                
                // Draw zone border
                this.ctx.strokeStyle = '#333';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
                
                // Draw zone name
                this.ctx.fillStyle = '#000';
                this.ctx.font = '14px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(zone.name, 
                    zone.x + zone.width / 2,
                    zone.y + zone.height / 2
                );
            });
        }

        this.ctx.fillText('Hello, Canvas!', 12, 12);
    }

    isPointInZone(x, y, zone) {
        return x >= zone.x && x <= zone.x + zone.width &&
               y >= zone.y && y <= zone.y + zone.height;
    }
}

export default GameRenderer;