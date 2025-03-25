export interface Effect {
  EffectId: string;
  AmountPerTurn: number;
}

export interface UserSkillEffect extends Effect {
  SkillId: string;
}

export interface UserStatEffect extends Effect {
  StatId: string;
}

export interface TerritoryStatEffect extends Effect {
  TerritoryStatId: string;
}

export interface ZoneStatEffect extends Effect {
  ZoneStatId: string;
}
