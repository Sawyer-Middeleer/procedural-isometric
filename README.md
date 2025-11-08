# Procedural Graphics - Isometric System

A procedural isometric illustration using PixiJS React and Next.js. This project implements a 3x3 grid of isometric tiles with z-axis (elevation) support as the foundation for a larger procedural system.

## Features

- Isometric projection with proper coordinate conversion
- 3x3 tile grid with varying elevations
- Depth sorting using painter's algorithm
- 3D effect with side faces for elevated tiles
- Built with Next.js 15 + TypeScript + PixiJS v8

## Tech Stack

- Framework: Next.js 15.5.6
- Rendering: PixiJS v8.2.6
- React Integration: @pixi/react v8.0.3
- Language: TypeScript 5.7
- Styling: Tailwind CSS 3.4

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000 to view the isometric grid in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
procedural-graphics/
├── app/
│   ├── page.tsx              # Main page with PixiJS canvas
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── IsometricGrid.tsx     # Grid container component
│   ├── IsometricTile.tsx     # Individual tile component
│   └── PixiApp.tsx           # PixiJS Application wrapper
├── lib/
│   ├── isometric-utils.ts    # Coordinate conversion utilities
│   ├── tile-data.ts          # Grid data structures
│   └── pixi-extensions.ts    # PixiJS component registration
├── types/
│   └── tile.types.ts         # TypeScript interfaces
└── README.md                 # This file
```

## How It Works

### Isometric Projection

Standard isometric projection formulas convert 3D grid coordinates to 2D screen space:

```typescript
screenX = originX + (gridX - gridY) * (tileWidth / 2)
screenY = originY + (gridX + gridY) * (tileHeight / 2) - z
```

Notes:
- `z` is the base elevation of the tile. If a tile has thickness (`height`), the top face is rendered at `z + height` while the side faces extend down to the base `z`.
- The 2:1 ratio between `tileWidth` and `tileHeight` is kept for a classic isometric look (e.g., 100x50).

### Depth Sorting

Tiles are sorted using the painter's algorithm to ensure correct visual layering:

```typescript
depth = gridX + gridY + (z * 0.01)
```

Lower depth values render first (behind). The small positive `z` term ensures higher tiles render later (in front) without overwhelming the primary `gridX + gridY` ordering.

### Rendering Order

- Side faces are drawn first (left/right), then the top face, then a subtle outline for clarity. This ensures the top face neatly occludes the sides.

## Customization

### Tile Dimensions

Edit `components/PixiApp.tsx` to adjust tile size:

```typescript
const CONFIG: TileConfig = {
  tileWidth: 100,    // Width of diamond
  tileHeight: 50,    // Height of diamond (2:1 ratio)
  tileDepth: 30,     // Visual depth for side faces (optional)
  originX: 400,      // X origin (center point)
  originY: 150,      // Y origin (top offset)
};
```

### Grid Data

Edit `lib/tile-data.ts` to modify the grid:

```typescript
export const GRID_DATA: TileData[] = [
  { gridX: 0, gridY: 0, z: 0, type: 'grass' },
  // Add more tiles...
];
```

### Colors

Change tile colors in `lib/tile-data.ts`:

```typescript
export const TILE_TYPES = {
  grass: 0x2ecc71, // Green
  water: 0x3498db, // Blue
  road: 0x95a5a6,  // Gray
  block: 0x2c3e50, // Default block color
} as const;
```

## License

MIT

## References

- Pikuma Isometric Guide: https://pikuma.com/blog/isometric-projection-in-games
- PixiJS React Documentation: https://react.pixijs.io/
- PixiJS v8 API: https://pixijs.download/release/docs/index.html
- Next.js Documentation: https://nextjs.org/docs

