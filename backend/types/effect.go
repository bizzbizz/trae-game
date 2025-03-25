package types

type Effect struct {
	AmountPerTurn float32 `yaml:"AmountPerTurn"`
}

type UserSkillEffect struct {
	Effect      `yaml:",inline"`
	UserSkillID `yaml:"SkillId"`
}

type UserStatEffect struct {
	Effect     `yaml:",inline"`
	UserStatID `yaml:"StatId"`
}

type TerritoryStatEffect struct {
	Effect          `yaml:",inline"`
	TerritoryStatID `yaml:"TerritoryStatId"`
}

type ZoneStatEffect struct {
	Effect     `yaml:",inline"`
	ZoneStatID `yaml:"ZoneStatId"`
}
