package types

import (
	"github.com/google/uuid"
)

// Global static list of users
var Users = append(player_list, npc_list...)
var player_list = []User{alice, bob, charlie}
var npc_list = []User{zombies, survivors, bandits}

var alice = User{UserID: UserID(uuid.New()), UserName: "Alice", IsActive: true}
var bob = User{UserID: UserID(uuid.New()), UserName: "Bob", IsActive: false}
var charlie = User{UserID: UserID(uuid.New()), UserName: "Charlie", IsActive: true}
var bandits = User{UserID: UserID(uuid.New()), UserName: "Bandits", IsActive: true}
var survivors = User{UserID: UserID(uuid.New()), UserName: "Survivors", IsActive: true}
var zombies = User{UserID: UserID(uuid.New()), UserName: "Zombies", IsActive: true}

type User struct {
	UserID   `yaml:"id"`
	UserName `yaml:"name"`
	IsActive bool `yaml:"is_active"`
	UserEconomy
}

type UserEconomy struct {
	UserEconomyResources `yaml:"resources"`
	UserEconomyFlows     `yaml:"unlocked_flows"`
}
