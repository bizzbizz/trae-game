package types

var SocietyTemplate = *loadConfig[Society]()

type Society struct {
	Hobbies []Hobby
	Needs   []string
	Perks   []string
	Buffs   []string
}

type Hobby struct {
	ID         string
	Icon       string
	Name       string
	SkillBonus map[string]float32
	Effects    map[Effect]float32
}
