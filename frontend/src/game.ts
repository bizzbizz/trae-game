import TreeView from './tree';
import GameRenderer from './render';
import { World, Zone } from './types/world';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const renderer = new GameRenderer(canvas);
const gameStateTree = document.getElementById('gameStateTree');

let world: World = {} as World;

const treeView = new TreeView();

window.addEventListener('click', (e: MouseEvent) => {
    if (!world || !world.WorldMap || !world.WorldMap.Zones) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedZone = Object.values(world.WorldMap.Zones).find((zone: Zone) => 
        renderer.isPointInZone(x, y, zone)
    );

    if (clickedZone) {
        console.log('Clicked zone:', clickedZone.Name);
    }
});

function render(): void {
    renderer.render(world);
    requestAnimationFrame(render);
}

async function resetWorld(): Promise<void> {
    try {
        const response = await fetch('http://localhost:8080/api/reset-world');
        world = await response.json() as World;
        console.log(world)
        treeView.updateGameStateTree(world);
    } catch (error) {
        console.error('Failed to generate world:', error);
    }
}

// Initialize event listeners
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabType = (tab as HTMLElement).dataset.tab as 'world' | 'gameMechanics';
        treeView.setCurrentTab(tabType);
        treeView.updateGameStateTree(world);
    });
});

const nextTurnButton = document.getElementById('nextTurnButton');
if (nextTurnButton) {
    nextTurnButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:8080/api/next-turn', { method: 'POST' });
            world = await response.json() as World;
            console.log(world)
            treeView.updateGameStateTree(world);
        } catch (error) {
            console.error('Failed to process next turn:', error);
        }
    });
}

// Initialize the game
window.addEventListener('load', async () => {
    await resetWorld();
    render();
});