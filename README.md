# Trae Game

A turn-based strategy game with territory control mechanics.

## Project Structure

- `/backend` - Go backend server
  - `fakeWorldProvider.go` - Generates game world with zones and territories
- `/public` - Frontend assets and HTML
  - `index.html` - Main game interface

## Features

- Dynamic world generation with unique zones and territories
- Interactive game state visualization
- Turn-based gameplay mechanics
- Real-time game state tree display
- Canvas-based map rendering

## Setup

1. Install Go (1.16 or later)
2. Clone the repository
3. Install dependencies:
```bash
go mod tidy