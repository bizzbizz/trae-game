package main

import (
	"encoding/json"
	"log"
	"net/http"
	"traegame/backend"
)

func main() {
	provider := backend.NewFakeWorldProvider()
	var world *backend.World

	// Handle world generation API endpoint
	http.HandleFunc("/api/generate-world", func(w http.ResponseWriter, r *http.Request) {
		world := provider.GenerateWorld(800, 600, 5, 2)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(world)
	})

	// Add next turn endpoint
	http.HandleFunc("/api/next-turn", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		if world == nil {
			world = provider.GenerateWorld(800, 600, 5, 2)
		}

		// Increment turn counter
		world.Turn++

		// Toggle phase between "movement" and "combat"
		if world.Phase == "movement" {
			world.Phase = "combat"
		} else {
			world.Phase = "movement"
		}

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
