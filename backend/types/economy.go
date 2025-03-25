package types

var EconomyTemplate = *loadConfig[Economy]()

type Economy struct {
	Businesses []Business `yaml:"Businesses"`
	Resources  []Resource `yaml:"Resources"`
}

type Business struct {
	BusinessId   `yaml:"Id"`
	Icon         Icon                       `yaml:"Icon"`
	Description  string                     `yaml:"Description"`
	CanBeHobby   bool                       `yaml:"CanBeHobby"`
	Requirements []ProductionFlowBatchInput `yaml:"Requirements"`
	Productions  []Production               `yaml:"Productions"`
}

type Resource struct {
	ResourceID `yaml:"Id"`
	Icon       Icon `yaml:"Icon"`
	Category   Tag  `yaml:"Category"`
}

type Production struct {
	ProductionId     `yaml:"Id"`
	Icon             Icon              `yaml:"Icon"`
	UserSkillEffects []UserSkillEffect `yaml:"UserSkillEffects"`
	Flows            []ProductionFlow  `yaml:"Flows"`
}

type ProductionFlow struct {
	ProductionFlowId `yaml:"Id"`
	MaxPeople        int                           `yaml:"MaxPeople"`
	Input            []ProductionFlowBatchInput    `yaml:"Input"`
	Catalysts        []ProductionFlowBatchCatalyst `yaml:"Catalysts"`
	Output           []ProductionFlowBatch         `yaml:"Output"`
}

type ProductionFlowBatch struct {
	ResourceID    `yaml:"Id"`
	AmountPerTurn float32 `yaml:"AmountPerTurn"`
}

type ProductionFlowBatchInput struct {
	ProductionFlowBatch `yaml:",inline"`
	IsConsumed          bool `yaml:"IsConsumed"`
}

type ProductionFlowBatchCatalyst struct {
	ProductionFlowBatchInput `yaml:",inline"`
	OutputMultiplier         map[string]float32 `yaml:"OutputMultiplier"`
	OutputAdd                map[string]float32 `yaml:"OutputAdd"`
	InputMultiplier          map[string]float32 `yaml:"InputMultiplier"`
	InputSubtract            map[string]float32 `yaml:"InputSubtract"`
}
