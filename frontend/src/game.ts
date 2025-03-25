import TreeView from './tree';
import GameRenderer from './render';
import { World, Zone } from './types/world';

export let world: World | undefined;
let renderer: GameRenderer | undefined;
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const gameStateTree = document.getElementById('gameStateTree');

const treeView = new TreeView();

window.addEventListener('click', (e: MouseEvent) => {
  if (!world || !world.WorldMap || !world.WorldMap.Zones) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const clickedZone = Object.values(world.WorldMap.Zones).find((zone: Zone) => renderer?.isPointInZone(x, y, zone));

  if (clickedZone) {
    console.log('Clicked zone:', clickedZone.Name);
  }
});

async function resetWorld(): Promise<void> {
  try {
    const response = await fetch('http://localhost:8080/api/reset-world');
    world = (await response.json()) as World;
    console.log(world);
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
    if (world !== undefined) {
      treeView.updateGameStateTree(world);
    }
  });
});

const nextTurnButton = document.getElementById('nextTurnButton');
if (nextTurnButton) {
  nextTurnButton.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:8080/api/next-turn', { method: 'POST' });
      world = (await response.json()) as World;
      console.log(world);
      treeView.updateGameStateTree(world);
    } catch (error) {
      console.error('Failed to process next turn:', error);
    }
  });
}

function render(): void {
  world && renderer && renderer.render(world);
  requestAnimationFrame(render);
}

// Initialize the game
window.addEventListener('load', async () => {
  await resetWorld();
  world && (renderer = new GameRenderer(world, canvas));
  render();
});
