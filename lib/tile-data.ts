// Tile data configuration for 3x3 isometric grid

import type { TileData } from '@/types/tile.types';

/**
 * Generate stacked tiles at a grid position
 * @param gridX Grid X coordinate
 * @param gridY Grid Y coordinate
 * @param maxZ Maximum height (tiles created at 0, layerHeight, 2*layerHeight, ... up to maxZ)
 * @param type Tile type
 * @param layerHeight Height of each layer (default: 20)
 * @returns Array of TileData objects representing stacked layers
 */
function generateStackedTiles(
  gridX: number,
  gridY: number,
  maxZ: number,
  type: string = 'block',
  layerHeight: number = 20
): TileData[] {
  const tiles: TileData[] = [];

  for (let z = 0; z <= maxZ; z += layerHeight) {
    tiles.push({
      gridX,
      gridY,
      z,
      type,
      height: layerHeight,
      outlineColor: 0xffffff,
    });
  }

  return tiles;
}

export const GRID_DATA: TileData[] = [
  // Row 0 (back) - ground level
  { gridX: 0, gridY: 0, z: 0, type: 'road', outlineColor: 0xffffff },
  { gridX: 1, gridY: 0, z: 0, type: 'road', outlineColor: 0xffffff },
  { gridX: 2, gridY: 0, z: 0, type: 'road', outlineColor: 0xffffff },

  // Row 1 (middle) - stacked blocks at different heights
  ...generateStackedTiles(0, 1, 40, 'block', 20), // Stack up to 40 (3 layers: 0, 20, 40)
  ...generateStackedTiles(1, 1, 20, 'block', 20), // Stack up to 20 (2 layers: 0, 20)
  ...generateStackedTiles(2, 1, 0, 'block', 20),  // Single layer at ground (just 0)

  // Row 2 (front) - ground level
  { gridX: 0, gridY: 2, z: 0, type: 'road', outlineColor: 0xffffff },
  { gridX: 1, gridY: 2, z: 0, type: 'road', outlineColor: 0xffffff },
  { gridX: 2, gridY: 2, z: 0, type: 'road', outlineColor: 0xffffff },
];

export const TILE_TYPES = {
  block: 0x2c3e50,
  grass: 0x2ecc71,
  water: 0x3498db,
  road: 0x95a5a6,
} as const;
