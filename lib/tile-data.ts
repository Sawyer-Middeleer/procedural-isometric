// Tile data configuration for 3x3 isometric grid

import type { TileData } from '@/types/tile.types';

export const GRID_DATA: TileData[] = [
  // Row 0 (back) - ground level
  { gridX: 0, gridY: 0, z: 0, type: 'grass', outlineColor: 0xffffff },
  { gridX: 1, gridY: 0, z: 0, type: 'grass', outlineColor: 0xffffff },
  { gridX: 2, gridY: 0, z: 0, type: 'grass', outlineColor: 0xffffff },

  // Row 1 (middle) - elevated
  { gridX: 0, gridY: 1, z: 20, type: 'block', outlineColor: 0xffffff },
  { gridX: 1, gridY: 1, z: 40, type: 'block', outlineColor: 0xffffff },
  { gridX: 2, gridY: 1, z: 20, type: 'block', outlineColor: 0xffffff },

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
  elevated: 0xe67e22,
} as const;
