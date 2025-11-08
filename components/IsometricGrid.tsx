'use client';

import { IsometricTile } from './IsometricTile';
import { sortTilesByDepth } from '@/lib/isometric-utils';
import type { IsometricGridProps } from '@/types/tile.types';

export function IsometricGrid({ tiles, config }: IsometricGridProps) {
  // Sort tiles by depth (painter's algorithm)
  const sortedTiles = sortTilesByDepth(tiles);

  return (
    <>
      {sortedTiles.map((tile, index) => (
        <IsometricTile
          key={`tile-${tile.gridX}-${tile.gridY}`}
          tile={tile}
          config={config}
        />
      ))}
    </>
  );
}
