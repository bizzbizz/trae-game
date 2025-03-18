package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	t "traegame/backend/types"
)

// todo concurrency
var world *t.World
var turn int

func main() {
	// Handle world generation API endpoint
	http.HandleFunc("/api/reset-world", func(w http.ResponseWriter, r *http.Request) {
		// Remove the := which was creating a new local variable
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(t.WorldMapTemplate)
	})

	// Add next turn endpoint
	http.HandleFunc("/api/next-turn", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		if world == nil {
			// todo make copy for user and cache it
			world = &t.World{
				Turn:     0,
				WorldMap: t.WorldMapTemplate,
			}
		}

		for i := 0; i < len(t.Users); i++ {
			user := &t.Users[i]
			if user.IsActive {
				user.Perform()
			}
		}

		// Increment turn counter
		world.Turn++
		fmt.Println("Turn: ", world.Turn)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(world)
	})

	// Serve static files from the public directory
	http.Handle("/", http.FileServer(http.Dir("public")))

	log.Println("Server starting on http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
