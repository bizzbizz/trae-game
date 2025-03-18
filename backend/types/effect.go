package types

type Effect struct {
	AmountPerTurn float32
}

type UserSkillID string
type UserSkillEffect struct {
	Effect
	SkillID UserSkillID
}

type UserStatID string
type UserStatEffect struct {
	Effect
	StatID UserStatID
}

type TerritoryStatID string
type TerritoryStatEffect struct {
	Effect
	TerritoryStatID TerritoryStatID
}

type ZoneStatID string
type ZoneStatEffect struct {
	Effect
	ZoneStatID ZoneStatID
}
