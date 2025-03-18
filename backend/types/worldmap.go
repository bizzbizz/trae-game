package types

type WorldMap struct {
	Zones       []Zone
	Territories []Territory
}

var WorldMapTemplate = WorldMap{
	Zones:       *loadConfig[[]Zone](),
	Territories: *loadConfig[[]Territory](),
}

type Zone struct {
	ID        string   `json:"id"`
	Name      string   `json:"name"`
	Type      string   `json:"type"`
	X         float64  `json:"x"`
	Y         float64  `json:"y"`
	Width     float64  `json:"width"`
	Height    float64  `json:"height"`
	PlayerIDs []string `json:"player_ids"`
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
	ID           string   `json:"id"`
	Name         string   `json:"name"`
	ControlledBy *string  `json:"controlledBy"`
	Zones        []string `json:"zones"`
}
