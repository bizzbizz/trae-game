package main

import (
	"encoding/json"
	"log"
	"net/http"
	"traegame/backend"
)

func main() {
	provider := backend.NewFakeWorldProvider()

	// Handle world generation API endpoint
	http.HandleFunc("/api/generate-world", func(w http.ResponseWriter, r *http.Request) {
		world := provider.GenerateWorld(800, 600, 5, 2)
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