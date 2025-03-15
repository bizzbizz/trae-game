package backend

import (
	"fmt"
	"math"
	"math/rand"
	"time"

	"github.com/google/uuid"
)

type Zone struct {
	ID        string   `json:"id"`
	Name      string   `json:"name"`
	X         float64  `json:"x"`
	Y         float64  `json:"y"`
	Width     float64  `json:"width"`
	Height    float64  `json:"height"`
	PlayerIDs []string `json:"player_ids"`
}

type Territory struct {
	ID           string   `json:"id"`
	Name         string   `json:"name"`
	ControlledBy *string  `json:"controlledBy"`
	Zones        []string `json:"zones"`
}

type World struct {
	Zones       map[string]*Zone      `json:"zones"`
	Territories map[string]*Territory `json:"territories"`
	Turn        int                   `json:"turn"`
	Phase       string                `json:"phase"`
}

type FakeWorldProvider struct {
	zoneNames      []string
	territoryNames []string
}

func NewFakeWorldProvider() *FakeWorldProvider {
	return &FakeWorldProvider{
		zoneNames: []string{
			"Crystal Valley", "Mystic Peaks", "Shadow Marsh", "Dragon Reach", "Sunlit Plains",
			"Frost Haven", "Ember Gorge", "Storm Peak", "Twilight Woods", "Ancient Basin",
			"Thunder Ridge", "Moonlit Bay", "Crimson Desert", "Emerald Forest", "Azure Coast",
		},
		territoryNames: []string{
			"Northern Kingdom", "Southern Realm", "Eastern Empire", "Western Dominion",
			"Central Alliance", "Coastal Federation", "Mountain Republic", "Desert Sultanate",
		},
	}
}

func (f *FakeWorldProvider) GenerateWorld(width, height float64, zoneCount, territoryCount int) *World {
	if width == 0 {
		width = 800
	}
	if height == 0 {
		height = 600
	}
	if zoneCount == 0 {
		zoneCount = 5
	}
	if territoryCount == 0 {
		territoryCount = 2
	}

	zones := f.generateZones(width, height, zoneCount)
	territories := f.generateTerritories(zones, territoryCount)

	return &World{
		Zones:       zones,
		Territories: territories,
		Turn:        1,
		Phase:       "movement",
	}
}

func (f *FakeWorldProvider) generateZones(width, height float64, count int) map[string]*Zone {
	zones := make(map[string]*Zone)
	usedNames := make(map[string]bool)
	minSize := 150.0
	maxSize := 250.0

	for i := 0; i < count; i++ {
		zoneName := f.getRandomUniqueName(f.zoneNames, usedNames)
		zoneWidth := minSize + rand.Float64()*(maxSize-minSize)
		zoneHeight := minSize + rand.Float64()*(maxSize-minSize)

		x := rand.Float64() * (width - zoneWidth)
		y := rand.Float64() * (height - zoneHeight)

		zoneID := uuid.New().String()
		zones[zoneID] = &Zone{
			ID:        zoneID,
			Name:      zoneName,
			X:         x,
			Y:         y,
			Width:     zoneWidth,
			Height:    zoneHeight,
			PlayerIDs: make([]string, 0),
		}
	}

	return zones
}

func (f *FakeWorldProvider) generateTerritories(zones map[string]*Zone, count int) map[string]*Territory {
	territories := make(map[string]*Territory)
	usedNames := make(map[string]bool)
	zoneIDs := make([]string, 0, len(zones))

	for id := range zones {
		zoneIDs = append(zoneIDs, id)
	}

	f.shuffleArray(zoneIDs)
	zonesPerTerritory := int(math.Ceil(float64(len(zoneIDs)) / float64(count)))

	for i := 0; i < count; i++ {
		territoryID := uuid.New().String()
		start := i * zonesPerTerritory
		end := int(math.Min(float64((i+1)*zonesPerTerritory), float64(len(zoneIDs))))
		territoryZones := zoneIDs[start:end]

		territories[territoryID] = &Territory{
			ID:           territoryID,
			Name:         f.getRandomUniqueName(f.territoryNames, usedNames),
			ControlledBy: nil,
			Zones:        territoryZones,
		}
	}

	return territories
}

func (f *FakeWorldProvider) getRandomUniqueName(nameList []string, usedNames map[string]bool) string {
	availableNames := make([]string, 0)
	for _, name := range nameList {
		if !usedNames[name] {
			availableNames = append(availableNames, name)
		}
	}

	if len(availableNames) == 0 {
		baseName := nameList[rand.Intn(len(nameList))]
		i := 1
		for {
			newName := baseName + " " + fmt.Sprintf("%d", i)
			if !usedNames[newName] {
				usedNames[newName] = true
				return newName
			}
			i++
		}
	}

	name := availableNames[rand.Intn(len(availableNames))]
	usedNames[name] = true
	return name
}

func (f *FakeWorldProvider) shuffleArray(array []string) {
	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(array), func(i, j int) {
		array[i], array[j] = array[j], array[i]
	})
}
