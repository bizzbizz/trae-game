package types

var EconomyTemplate = *loadConfig[Economy]()

type Economy struct {
	Businesses         []Business
	ResourceCategories []ResourceCategory
}

type Business struct {
	Name         string `yaml:"name"`
	Icon         string `yaml:"icon"`
	Description  string `yaml:"description"`
	CanBeHobby   bool   `yaml:"canBeHobby"`
	Requirements []ProductionFlowBatchInput
	Productions  []Production
}

type ResourceCategory struct {
	Name      string `yaml:"name"`
	Icon      string `yaml:"icon"`
	Resources []Resource
}

type Resource struct {
	Name       string `yaml:"name"`
	Icon       string `yaml:"icon"`
	CategoryId string
}

type Production struct {
	Name              string `yaml:"name"`
	Icon              string
	ZoneTypeBonus     map[string]float32 // Zero or positive. Effectiveness of a zone type for this production.
	SkillBonus        map[string]float32 // Zero or positive. Effectiveness of a skill for this production.
	SkillUpgradeBonus map[string]float32 // Zero or positive. How fast of a skill upgrades in this production.
	Flows             map[string]ProductionFlow
}

type ProductionFlow struct {
	Name      string
	MaxPeople int
	Input     []ProductionFlowBatchInput `yaml:"input_list"`
	Catalysts []ProductionFlowBatchCatalyst
	Output    []ProductionFlowBatch `yaml:"output_list"`
}

type ResourceID string
type ProductionFlowBatch struct {
	ResourceID    ResourceID
	AmountPerTurn float32 // Always positive or zero. Indicates how much input or catalys is used, or how much output is created.
}

type ProductionFlowBatchInput struct {
	ProductionFlowBatch
	IsConsumed bool
}

type ProductionFlowBatchCatalyst struct {
	ProductionFlowBatchInput
	OutputMultiplier map[string]float32 // Always positive. Indicates how much each output is multiplied by, if this resource is available.
	OutputAdd        map[string]float32 // Always positive. Indicates how much each output is added by, if this resource is available.
	InputMultiplier  map[string]float32 // Always positive. Indicates how much each input is multiplied by, if this resource is available.
	InputSubtract    map[string]float32 // Always positive. Indicates how much each input is subtracted by, if this resource is available.
}
