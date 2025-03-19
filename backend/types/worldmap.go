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
	ID        string   `yaml:"id"`
	Name      string   `yaml:"name"`
	Type      string   `yaml:"type"`
	X         float64  `yaml:"x"`
	Y         float64  `yaml:"y"`
	Width     float64  `yaml:"width"`
	Height    float64  `yaml:"height"`
	PlayerIDs []string `yaml:"player_ids"`
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
