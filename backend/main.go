package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	t "traegame/types"
)

// todo concurrency
var world *t.World

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}
func main() {
	// Handle world generation API endpoint
	http.HandleFunc("/api/reset-world", func(w http.ResponseWriter, r *http.Request) {
		world = &t.World{
			Turn:     0,
			WorldMap: t.WorldMapTemplate,
			Users:    t.Users,
			Economy:  t.EconomyTemplate,
			Society:  t.SocietyTemplate,
		}

		enableCors(&w)
		// Remove the := which was creating a new local variable
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(world)
	})

	// Add next turn endpoint
	http.HandleFunc("/api/next-turn", func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		if r.Method == http.MethodOptions {
			return
		}
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		for i := 0; i < len(t.Users); i++ {
			user := &t.Users[i]
			if user.IsActive {
				//user.Perform()
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
