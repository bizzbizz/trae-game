import { Business, Economy } from "./economy";
import { Society } from "./society";
import { User } from "./user";

export interface World {
    WorldMap: WorldMap;
    Turn: number;
    Users: User[];
    Economy: Economy;
    Society: Society;
}

export interface WorldMap {
    Zones: Zone[];
    Territories: Territory[];
}

export interface Zone {
    ZoneId: string;
    Name: string;
    Type: string;
    X: number;
    Y: number;
    Width: number;
    Height: number;
    BusinessId: string;
}

export interface Territory {
    TerritoryId: string;
    Name: string;
    ControlledBy: string | null;
    Zones: string[];
}