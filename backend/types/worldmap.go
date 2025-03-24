package types

type WorldMap struct {
	Zones       []Zone      `yaml:"zones"`
	Territories []Territory `yaml:"territories"`
}

var WorldMapTemplate = WorldMap{
	Zones:       *loadConfig[[]Zone](),
	Territories: *loadConfig[[]Territory](),
}

type Zone struct {
	ID                string     `yaml:"id"`
	Name              string     `yaml:"name"`
	Type              string     `yaml:"type"`
	PlayerIDs         []UserName `yaml:"player_ids"`
	InitialBusinessID BusinessId `yaml:"initial_business_id"`
	Business          `yaml:",inline"`
	Polygon           `yaml:",inline"`
}

var ZoneTypes = []string{
	"house",
	"shop",
	"street",
	"park",
	"factory",
	"office",
	"govt",
}

type Territory struct {
	ID           string   `yaml:"id"`
	Name         string   `yaml:"name"`
	ControlledBy *string  `yaml:"controlled_by"`
	Zones        []string `yaml:"zones"`
}

type Polygon struct {
	X      float64 `yaml:"x"`
	Y      float64 `yaml:"y"`
	Width  float64 `yaml:"width"`
	Height float64 `yaml:"height"`
}
