import { Effect } from './effect';

export interface Society {
  Hobbies: Hobby[];
  Needs: string[];
  Perks: string[];
  Buffs: string[];
}

export interface Hobby {
  HobbyId: string;
  Icon: string;
  Name: string;
  Effects: Record<string, Effect>;
}
