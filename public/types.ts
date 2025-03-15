// Player related interfaces
export interface Player {
    id: string;
    name: string;
    zone_id: string;
    x?: number;
    y?: number;
    color?: string;
    currentZone?: string;
    lastMoveTurn?: number;
    nextMoveTurn?: number;
}

// World and territory related interfaces
export interface Zone {
    id: string;
    name: string;
    territory_Id: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    player_ids?: string[];
}

export interface Territory {
    id: string;
}

export interface World {
    zones: { [key: string]: Zone };
    territories: { [key: string]: Territory };
    turn?: number;
}

// Game mechanics related interfaces
export interface Resource {
    name: string;
    value: number;
}

export interface Production {
    name: string;
    input: {
        resource_Ids: string[];
    };
    output: {
        resource_Ids: string[];
    };
}

export interface Building {
    name: string;
    productions: Production[];
}

// Main game state interfaces
export interface GameState {
    players: { [key: string]: Player };
    world: World;
}

export interface GameMechanics {
    resources: { [key: string]: Resource };
    buildings: { [key: string]: Building };
}

// WebSocket message interfaces
export interface WebSocketMessage {
    type: 'init' | 'playerJoined' | 'playerLeft' | 'playerMoved' | 'gameStateUpdate' | 'nextTurn';
    id?: string;
    player?: Player;
    playerId?: string;
    gameState?: GameState;
}