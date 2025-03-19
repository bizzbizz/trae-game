import TreeView from './tree.js';
import GameRenderer from './render.js';

const canvas = document.getElementById('gameCanvas');
const renderer = new GameRenderer(canvas);
const gameStateTree = document.getElementById('gameStateTree');

let gameState = {};
let gameMechanics = {};

const treeView = new TreeView();

window.addEventListener('click', (e) => {
    if (!gameState.world || !gameState.world.zones) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedZone = Object.values(gameState.world.zones).find(zone => 
        renderer.isPointInZone(x, y, zone)
    );

    if (clickedZone) {
        console.log('Clicked zone:', clickedZone.name);
    }
});

function render() {
    renderer.render(gameState);
    requestAnimationFrame(render);
}

async function resetWorld() {
    try {
        const response = await fetch('/api/reset-world');
        const world = await response.json();
        gameState = { world };
        treeView.updateGameStateTree(gameState, gameMechanics);
    } catch (error) {
        console.error('Failed to generate world:', error);
    }
}

// Initialize event listeners
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        treeView.setCurrentTab(tab.dataset.tab);
        treeView.updateGameStateTree(gameState, gameMechanics);
    });
});

document.getElementById('nextTurnButton').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/next-turn', { method: 'POST' });
        const updatedState = await response.json();
        gameState = updatedState;
        treeView.updateGameStateTree(gameState, gameMechanics);
    } catch (error) {
        console.error('Failed to process next turn:', error);
    }
});

// Initialize the game
window.addEventListener('load', async () => {
    await resetWorld();
    render();
});