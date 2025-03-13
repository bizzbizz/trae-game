# Trae Game

A 3D city visualization game built with React, Three.js, and TypeScript.

## Features

- Interactive 3D city environment
- Dynamic house generation from YAML configuration
- Camera controls for navigation
- Toolbar interface for interaction

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
```bash
git clone [repository-url]
cd trae-game
```

2. Install dependencies
```bash
npm install
```

## Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:11555`

## Building for Production

To create a production build:
```bash
npm run build
```

## Project Structure

```
src/
  ├── components/     # React components
  ├── hooks/          # Custom React hooks
  └── main.tsx        # Application entry point
public/
  ├── map/           # YAML configuration files
  └── toolbars/      # Toolbar assets
```

## Technologies Used

- React
- Three.js
- TypeScript
- Vite
- YAML