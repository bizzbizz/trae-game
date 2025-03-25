package types

type WorldMap struct {
	Zones       []Zone      `yaml:"Zones"`
	Territories []Territory `yaml:"Territories"`
}

var WorldMapTemplate = WorldMap{
	Zones:       *loadConfig[[]Zone](),
	Territories: *loadConfig[[]Territory](),
}

type Zone struct {
	ID                string     `yaml:"ID"`
	Name              string     `yaml:"Name"`
	Type              string     `yaml:"Type"`
	PlayerIDs         []UserName `yaml:"PlayerIDs"`
	InitialBusinessID BusinessId `yaml:"InitialBusinessID"`
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
	ID           string   `yaml:"ID"`
	Name         string   `yaml:"Name"`
	ControlledBy *string  `yaml:"ControlledBy"`
	Zones        []string `yaml:"Zones"`
}

type Polygon struct {
	X      float64 `yaml:"X"`
	Y      float64 `yaml:"Y"`
	Width  float64 `yaml:"Width"`
	Height float64 `yaml:"Height"`
}
