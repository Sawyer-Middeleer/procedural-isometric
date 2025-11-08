# Procedural Isometric System – Project Context

This project renders a small isometric scene using Next.js and PixiJS React. It demonstrates a 3x3 grid of tiles with support for elevation (z) and stacked blocks.

## Technology

- Framework: Next.js 15.5.6 (App Router)
- Rendering: PixiJS v8.2.6
- React Integration: @pixi/react v8.0.3
- Language: TypeScript 5.7

## Core Concepts

### Isometric Projection

Coordinate conversion from grid space to screen space:

```ts
screenX = originX + (gridX - gridY) * (tileWidth / 2)
screenY = originY + (gridX + gridY) * (tileHeight / 2) - z
```

Important details:
- `z` represents the base elevation of a tile.
- If a tile has thickness `height`, the top face is rendered at `z + height` while side faces extend downward to the base `z`.
- `tileWidth : tileHeight` is kept at a 2:1 ratio (e.g., 100×50) for a classic isometric look.

### Depth Sorting (Painter’s Algorithm)

Tiles render from back to front using a stable depth key:

```ts
depth = gridX + gridY + (z * 0.01)
```

We render ascending (lower first). The small positive `z` term ensures higher tiles draw later (in front) without overtaking the primary `gridX + gridY` ordering.

### Draw Order

To avoid overlap artifacts, the tile draw sequence is:
1. Left side face (if `height > 0`) – darkest
2. Right side face (if `height > 0`) – medium
3. Top face (diamond) – base color
4. Subtle outline for clarity

## Files

- `components/PixiApp.tsx` – PixiJS `<Application>` wrapper and config
- `components/IsometricGrid.tsx` – Sorts tiles by depth and renders them
- `components/IsometricTile.tsx` – Converts to screen space and draws a tile
- `lib/isometric-utils.ts` – Projection, depth utilities, color helpers
- `lib/tile-data.ts` – Demo grid data and type-to-color map
- `types/tile.types.ts` – TypeScript interfaces

## Usage Notes

- Always import `lib/pixi-extensions.ts` before using Pixi JSX components.
- Origin and tile dimensions are configurable in `PixiApp.tsx`.
- Tiles can specify `height` to extrude above their base `z`.

## Math Cheat Sheet

```ts
// Grid → Screen (originX/originY, 2:1 tiles)
screenX = originX + (gridX - gridY) * (tileWidth / 2)
screenY = originY + (gridX + gridY) * (tileHeight / 2) - z

// Top face elevation when the tile has thickness
topZ = z + height

// Painter’s depth (ascending sort)
depth = gridX + gridY + (z * 0.01)

// Simple darken helper
darken(color, factor) → ((r*factor)<<16) | ((g*factor)<<8) | (b*factor)
```

## Dev Commands

```bash
npm install
npm run dev
npm run build && npm start
```

## Troubleshooting

- Tiles overlap incorrectly → ensure `sortTilesByDepth()` is used and the depth formula matches above.
- Side faces cover the top → ensure draw order is sides first, then top.
- Tiles appear too low/high → check `originY` and remember top uses `z + height`.

