// Tile data configuration for 3x3 isometric grid

import type { TileData } from '@/types/tile.types';

export const GRID_DATA: TileData[] = [
  // Row 0 (back) - Green, ground level
  { gridX: 0, gridY: 0, z: 0, color: 0x2ecc71, type: 'grass' },
  { gridX: 1, gridY: 0, z: 0, color: 0x2ecc71, type: 'grass' },
  { gridX: 2, gridY: 0, z: 0, color: 0x2ecc71, type: 'grass' },

  // Row 1 (middle) - Orange, elevated
  { gridX: 0, gridY: 1, z: 20, color: 0xe67e22, type: 'elevated' },
  { gridX: 1, gridY: 1, z: 40, color: 0xe67e22, type: 'elevated' },
  { gridX: 2, gridY: 1, z: 20, color: 0xe67e22, type: 'elevated' },

  // Row 2 (front) - Blue, ground level
  { gridX: 0, gridY: 2, z: 0, color: 0x3498db, type: 'water' },
  { gridX: 1, gridY: 2, z: 0, color: 0x3498db, type: 'water' },
  { gridX: 2, gridY: 2, z: 0, color: 0x3498db, type: 'water' },
];

export const TILE_TYPES = {
  grass: 0x2ecc71,
  water: 0x3498db,
  road: 0x95a5a6,
  elevated: 0xe67e22,
} as const;
