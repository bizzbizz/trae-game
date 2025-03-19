package types

type Effect struct {
	AmountPerTurn float32 `yaml:"amount_per_turn"`
}

type UserSkillEffect struct {
	Effect      `yaml:",inline"`
	UserSkillID `yaml:"skill_id"`
}

type UserStatEffect struct {
	Effect     `yaml:",inline"`
	UserStatID `yaml:"stat_id"`
}

type TerritoryStatEffect struct {
	Effect          `yaml:",inline"`
	TerritoryStatID `yaml:"territory_stat_id"`
}

type ZoneStatEffect struct {
	Effect     `yaml:",inline"`
	ZoneStatID `yaml:"zone_stat_id"`
}
