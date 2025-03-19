package types

var SocietyTemplate = *loadConfig[Society]()

type Society struct {
	Hobbies []Hobby  `yaml:"hobbies"`
	Needs   []string `yaml:"needs"`
	Perks   []string `yaml:"perks"`
	Buffs   []string `yaml:"buffs"`
}

type Hobby struct {
	HobbyId `yaml:"id"`
	Icon    string            `yaml:"icon"`
	Name    string            `yaml:"name"`
	Effects map[string]Effect `yaml:"effects"`
}
