// Isometric coordinate conversion and utility functions

import type { TileData, TileConfig, ScreenCoordinates } from '@/types/tile.types';

/**
 * Convert grid coordinates to screen coordinates using isometric projection
 */
export function gridToScreen(
  gridX: number,
  gridY: number,
  z: number,
  config: TileConfig
): ScreenCoordinates {
  const { tileWidth, tileHeight, originX, originY } = config;

  const x = originX + (gridX - gridY) * (tileWidth / 2);
  const y = originY + (gridX + gridY) * (tileHeight / 2) - z;

  return { x, y };
}

/**
 * Calculate depth value for sorting tiles (painter's algorithm)
 */
export function calculateDepth(
  gridX: number,
  gridY: number,
  z: number
): number {
  // Higher z should render later (in front),
  // so add a small z component to the depth key.
  // The small factor maintains primary ordering by grid position
  // while ensuring stacked layers sort correctly.
  return gridX + gridY + (z * 0.01);
}

/**
 * Sort tiles by depth (back to front) for proper rendering order
 */
export function sortTilesByDepth(tiles: TileData[]): TileData[] {
  return [...tiles].sort((a, b) => {
    const depthA = calculateDepth(a.gridX, a.gridY, a.z);
    const depthB = calculateDepth(b.gridX, b.gridY, b.z);
    return depthA - depthB;
  });
}

/**
 * Darken a hex color by a given factor
 */
export function darkenColor(color: number, factor: number): number {
  const r = Math.floor(((color >> 16) & 0xFF) * factor);
  const g = Math.floor(((color >> 8) & 0xFF) * factor);
  const b = Math.floor((color & 0xFF) * factor);

  return ((r << 16) | (g << 8) | b);
}
