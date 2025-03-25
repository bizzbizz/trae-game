package types

var EconomyTemplate = *loadConfig[Economy]()

type Economy struct {
	Businesses []Business `yaml:"businesses"`
	Resources  []Resource `yaml:"resources"`
}

type Business struct {
	BusinessId   `yaml:"id"`
	Icon         Icon                       `yaml:"icon"`
	Description  string                     `yaml:"description"`
	CanBeHobby   bool                       `yaml:"can_be_hobby"`
	Requirements []ProductionFlowBatchInput `yaml:"requirements"`
	Productions  []Production               `yaml:"productions"`
}

type Resource struct {
	ResourceID `yaml:"id"`
	Icon       Icon `yaml:"icon"`
	Category   Tag  `yaml:"category"`
}

type Production struct {
	ProductionId     `yaml:"id"`
	Icon             Icon              `yaml:"icon"`
	UserSkillEffects []UserSkillEffect `yaml:"user_skill_effects"`
	Flows            []ProductionFlow  `yaml:"flows"`
}

type ProductionFlow struct {
	ProductionFlowId `yaml:"id"`
	MaxPeople        int                           `yaml:"max_people"`
	Input            []ProductionFlowBatchInput    `yaml:"input"`
	Catalysts        []ProductionFlowBatchCatalyst `yaml:"catalysts"`
	Output           []ProductionFlowBatch         `yaml:"output"`
}

type ProductionFlowBatch struct {
	ResourceID    `yaml:"id"`
	AmountPerTurn float32 `yaml:"amount_per_turn"`
}

type ProductionFlowBatchInput struct {
	ProductionFlowBatch `yaml:",inline"`
	IsConsumed          bool `yaml:"is_consumed"`
}

type ProductionFlowBatchCatalyst struct {
	ProductionFlowBatchInput `yaml:",inline"`
	OutputMultiplier         map[string]float32 `yaml:"output_multiplier"`
	OutputAdd                map[string]float32 `yaml:"output_add"`
	InputMultiplier          map[string]float32 `yaml:"input_multiplier"`
	InputSubtract            map[string]float32 `yaml:"input_subtract"`
}
