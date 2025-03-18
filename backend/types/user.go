package types

import (
	"github.com/google/uuid"
)

// Global static list of users
var Users = append(player_list, npc_list...)
var player_list = []User{alice, bob, charlie}
var npc_list = []User{zombies, survivors, bandits}

var alice = User{ID: uuid.New(), Name: "Alice", IsActive: true}
var bob = User{ID: uuid.New(), Name: "Bob", IsActive: false}
var charlie = User{ID: uuid.New(), Name: "Charlie", IsActive: true}
var bandits = User{ID: uuid.New(), Name: "Bandits", IsActive: true}
var survivors = User{ID: uuid.New(), Name: "Survivors", IsActive: true}
var zombies = User{ID: uuid.New(), Name: "Zombies", IsActive: true}

type User struct {
	ID       uuid.UUID `json:"id"`
	Name     string    `json:"name"`
	IsActive bool
	Economy  UserEconomy
}

func (s *User) Perform() {
	// for i := range s.Economy.UnlockedFlows {
	// 	var flowId = s.Economy.UnlockedFlows[i]
	// 	//todo complete
	// }
}

type UserEconomy struct {
	Resources     map[string]float64
	UnlockedFlows []string
}
