# Procedural Isometric System - Project Context

## Overview

This is a procedural isometric illustration project built with Next.js 15 and PixiJS React. The current implementation features a 3x3 grid of isometric tiles with z-axis (elevation) support, serving as the foundation for a larger procedural system.

## Technology Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Rendering**: PixiJS v8.2.6 (WebGL-based 2D renderer)
- **React Integration**: @pixi/react v8.0.3
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Package Manager**: npm

## Key Concepts

### Isometric Projection

The project uses **isometric projection** to create a 3D illusion in 2D space.

**Core transformation formulas:**
```typescript
screenX = originX + (gridX - gridY) × (tileWidth / 2)
screenY = originY + (gridX + gridY) × (tileHeight / 2) - z
```

- `gridX, gridY` = Logical grid coordinates (0-2 for 3x3)
- `z` = Elevation/height in pixels
- `tileWidth = 100px`, `tileHeight = 50px` (2:1 ratio)

### Depth Sorting (Painter's Algorithm)

Tiles must be rendered from **back to front** to handle overlapping correctly:

```typescript
depth = gridX + gridY - (z × 0.01)
```

Lower depth values render first. The z-term is multiplied by 0.01 to prevent elevation from overriding the x+y sorting.

### PixiJS v8 Pattern

PixiJS v8 requires explicit component registration:

```typescript
import { extend } from '@pixi/react';
import { Container, Graphics } from 'pixi.js';

extend({ Container, Graphics });
```

After registration, components are available as JSX elements: `<pixiContainer>`, `<pixiGraphics>`, etc.

## Project Architecture

```
┌─────────────────────────────────────┐
│  app/page.tsx (Client Component)   │
│  - Dynamic import to avoid SSR      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  components/PixiApp.tsx             │
│  - <Application> root               │
│  - Canvas: 800×600px                │
│  - Background: 0x2c3e50             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  components/IsometricGrid.tsx       │
│  - Sorts tiles by depth             │
│  - Maps tiles to IsometricTile      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  components/IsometricTile.tsx       │
│  - Converts grid → screen coords    │
│  - Draws diamond shape (top face)   │
│  - Draws side faces (if z > 0)      │
│  - Uses <pixiGraphics> with draw    │
└─────────────────────────────────────┘
```

## File Guide

### Core Components

#### `components/PixiApp.tsx`
- **Purpose**: PixiJS Application wrapper
- **Key Details**:
  - Imports pixi-extensions to register components
  - Sets up 800×600 canvas with dark background
  - Defines tile configuration (dimensions, origin)
  - Passes GRID_DATA to IsometricGrid

#### `components/IsometricGrid.tsx`
- **Purpose**: Manages and renders the entire grid
- **Key Details**:
  - Receives tiles array and config
  - Sorts tiles using `sortTilesByDepth()` utility
  - Maps sorted tiles to `<IsometricTile>` components
  - Unique keys: `tile-${gridX}-${gridY}`

#### `components/IsometricTile.tsx`
- **Purpose**: Renders individual isometric tile
- **Key Details**:
  - Converts grid coords to screen coords
  - Uses `useCallback` for optimized draw function
  - Draws three parts:
    1. Top face (diamond) - base color
    2. Left face (if z > 0) - 60% brightness
    3. Right face (if z > 0) - 80% brightness
  - Adds black outline (alpha 0.3) for clarity

### Utilities & Data

#### `lib/isometric-utils.ts`
Core math functions:
- `gridToScreen()` - Coordinate conversion
- `calculateDepth()` - Depth sorting value
- `sortTilesByDepth()` - Sort tiles array
- `darkenColor()` - Color manipulation for shading

#### `lib/tile-data.ts`
Grid configuration:
- `GRID_DATA` - Array of 9 tiles (3×3 grid)
- `TILE_TYPES` - Color constants for different tile types

**Current grid layout:**
```
Row 0 (back):   Green tiles, z=0 (grass)
Row 1 (middle): Orange tiles, z=20/40 (elevated)
Row 2 (front):  Blue tiles, z=0 (water)
```

#### `lib/pixi-extensions.ts`
- **Critical**: Must be imported before using PixiJS components
- Registers: Container, Graphics, Sprite, Text
- Exports PixiComponents object for reference

#### `types/tile.types.ts`
TypeScript interfaces:
- `TileData` - Grid position, elevation, color
- `ScreenCoordinates` - x, y pixel position
- `TileConfig` - Tile dimensions and origin
- `IsometricTileProps`, `IsometricGridProps` - Component props

### Next.js Setup

#### `app/page.tsx`
- **Important**: Uses `'use client'` directive (required for dynamic import)
- Dynamically imports PixiApp with `ssr: false`
- Centers canvas with Tailwind classes
- Shows loading state while PixiApp loads

#### `next.config.ts`
- Webpack configuration for PixiJS
- Handles `.mjs` files as JavaScript modules

## Current Grid Configuration

```typescript
// Tile dimensions (2:1 ratio)
tileWidth: 100px
tileHeight: 50px
tileDepth: 30px

// Canvas origin (where grid center appears)
originX: 400px (center of 800px canvas)
originY: 150px (top offset for visibility)

// Canvas
width: 800px
height: 600px
background: 0x2c3e50 (dark blue-gray)
```

## How the Rendering Works

1. **Grid Data** → Defined in `lib/tile-data.ts`
2. **Depth Sort** → IsometricGrid sorts by x+y-z
3. **Coordinate Transform** → IsometricTile converts grid→screen
4. **Draw Graphics** → Each tile draws:
   - Diamond shape (top face)
   - Side faces (if elevated)
   - Outline (for definition)
5. **PixiJS Renders** → WebGL draws all graphics to canvas

## Common Patterns

### Adding New Tiles

Edit `lib/tile-data.ts`:
```typescript
{ gridX: 0, gridY: 0, z: 0, color: 0x2ecc71, type: 'grass' }
```

### Changing Colors

Edit `lib/tile-data.ts`:
```typescript
export const TILE_TYPES = {
  grass: 0x2ecc71,    // Hex color (no quotes)
  water: 0x3498db,
  // Add more...
}
```

### Adjusting Canvas Size

Edit `components/PixiApp.tsx`:
```typescript
<Application
  width={800}    // Change width
  height={600}   // Change height
  options={{ backgroundColor: 0x2c3e50 }}
/>
```

### Modifying Tile Dimensions

Edit `components/PixiApp.tsx`:
```typescript
const CONFIG: TileConfig = {
  tileWidth: 100,   // Width of diamond
  tileHeight: 50,   // Height of diamond (maintain 2:1 ratio)
  originX: 400,     // Adjust if canvas width changes
  originY: 150,
};
```

## Important Constraints

### PixiJS + Next.js
- **SSR Issue**: PixiJS requires browser APIs (WebGL/Canvas)
- **Solution**: Use `'use client'` + dynamic import with `ssr: false`
- **Import Order**: Always import `pixi-extensions.ts` before using components

### Tile Rendering Order
- **Critical**: Must sort by depth before rendering
- **Why**: No z-buffering; we use painter's algorithm
- **Formula**: Lower depth = render first = appears behind

### Coordinate System
- **Grid Origin**: Top-left is (0,0)
- **Screen Origin**: Configurable via `originX`, `originY`
- **Z-Axis**: Up is positive, affects screenY negatively

## Future Expansion Ideas

Based on current foundation, natural next steps:

1. **Larger Grids** - Expand beyond 3×3
2. **Buildings** - Add structures with varying heights
3. **Textures** - Replace solid colors with sprites
4. **Interactivity** - Click/hover events on tiles
5. **Animation** - Tile bounce, water ripple effects
6. **Procedural Generation** - Use noise functions for terrain
7. **Camera Controls** - Pan, zoom, rotate the view

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
```

## Debugging Tips

### Tiles Not Appearing
- Check console for PixiJS errors
- Verify `pixi-extensions.ts` is imported
- Ensure origin coordinates place tiles on canvas

### Wrong Rendering Order
- Verify `sortTilesByDepth()` is called
- Check depth calculation includes z-term
- Ensure tiles are mapped in sorted order

### TypeScript Errors
- Check all imports use `@/` alias
- Verify interface properties match usage
- Run `npm run build` to catch all errors

### Performance Issues
- Use `useCallback` for draw functions
- Avoid state changes in render loop
- Consider memoizing sorted tiles array

## Key Design Decisions

1. **2:1 Ratio** - Standard isometric projection angle
2. **Painter's Algorithm** - Simple, effective depth sorting
3. **Color Shading** - 60%/80%/100% brightness for depth perception
4. **Client Components** - Necessary for PixiJS browser APIs
5. **Dynamic Import** - Prevents SSR issues with PixiJS
6. **TypeScript** - Type safety for complex coordinate math

## Color Scheme

Current palette (from lib/tile-data.ts):
- **Green (0x2ecc71)** - Grass/nature tiles
- **Orange (0xe67e22)** - Elevated/platform tiles
- **Blue (0x3498db)** - Water tiles
- **Background (0x2c3e50)** - Canvas background

## Math Cheat Sheet

```typescript
// Grid to Screen (with elevation)
screenX = originX + (gridX - gridY) × 50
screenY = originY + (gridX + gridY) × 25 - z

// Depth (for sorting)
depth = gridX + gridY - (z × 0.01)

// Darken color
newColor = ((R × factor) << 16) | ((G × factor) << 8) | (B × factor)
```

## Performance Notes

- **Current**: 9 tiles render at 60 FPS easily
- **Scalability**: PixiJS can handle 1000+ tiles efficiently
- **Optimization**: Culling (only render visible tiles) becomes important at scale
- **Draw Calls**: Graphics are batched by PixiJS automatically

---

This project demonstrates foundational isometric rendering techniques that can scale to complex procedural systems. The modular architecture makes it easy to add buildings, decorations, animations, and procedural generation algorithms.
