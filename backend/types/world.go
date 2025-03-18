package types

import (
	"fmt"
	"os"
	"path/filepath"
	"reflect"
	"strings"

	"gopkg.in/yaml.v3"
)

type World struct {
	WorldMap WorldMap
	Turn     int
	Users    []User
	Economy  Economy
	Society  Society
}

func CreateWorld() *World {
	return &World{
		Users:    Users,
		Turn:     0,
		WorldMap: WorldMapTemplate,
		Economy:  EconomyTemplate,
		Society:  SocietyTemplate,
	}
}

// Generic function to load YAML config into any struct type
func loadConfig[T any]() *T {
	fullTypeName := reflect.TypeOf((*T)(nil)).Elem().String()
	parts := strings.Split(fullTypeName, ".")        // Remove package name
	typeName := strings.ToLower(parts[len(parts)-1]) // Get only struct name
	configPath := filepath.Join("config", typeName+".yaml")

	data, err := os.ReadFile(configPath)
	if err != nil {
		fmt.Printf("failed to read config file: %s\n", err)
		return nil
	}

	var config T
	if err := yaml.Unmarshal(data, &config); err != nil {
		fmt.Printf("failed to parse config: %s\n", err)
		return nil
	}

	return &config
}
