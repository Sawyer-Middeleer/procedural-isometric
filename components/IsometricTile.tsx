'use client';

import { useCallback } from 'react';
import type { Graphics } from 'pixi.js';
import type { IsometricTileProps } from '@/types/tile.types';
import { gridToScreen, darkenColor } from '@/lib/isometric-utils';
import { TILE_TYPES } from '@/lib/tile-data';

export function IsometricTile({ tile, config }: IsometricTileProps) {
  const { tileWidth, tileHeight } = config;
  const { gridX, gridY, z, type, color, outlineColor } = tile;

  // Derive color from type if not explicitly provided
  const tileColor = color ?? TILE_TYPES[type as keyof typeof TILE_TYPES] ?? 0xffffff;

  // Convert grid coordinates to screen coordinates
  const screenPos = gridToScreen(gridX, gridY, z, config);

  // Draw callback for Graphics component
  const draw = useCallback((g: Graphics) => {
    g.clear();

    // Draw top face (diamond)
    g.moveTo(0, -tileHeight / 2);
    g.lineTo(tileWidth / 2, 0);
    g.lineTo(0, tileHeight / 2);
    g.lineTo(-tileWidth / 2, 0);
    g.closePath();
    g.fill(tileColor);

    // Draw side faces if elevated
    if (z > 0) {
      // Left face (darkest)
      g.moveTo(-tileWidth / 2, 0);
      g.lineTo(0, tileHeight / 2);
      g.lineTo(0, tileHeight / 2 + z);
      g.lineTo(-tileWidth / 2, z);
      g.closePath();
      g.fill(darkenColor(tileColor, 0.6));

      // Right face (medium)
      g.moveTo(tileWidth / 2, 0);
      g.lineTo(0, tileHeight / 2);
      g.lineTo(0, tileHeight / 2 + z);
      g.lineTo(tileWidth / 2, z);
      g.closePath();
      g.fill(darkenColor(tileColor, 0.8));
    }

    // Draw outline for clarity
    g.moveTo(0, -tileHeight / 2);
    g.lineTo(tileWidth / 2, 0);
    g.lineTo(0, tileHeight / 2);
    g.lineTo(-tileWidth / 2, 0);
    g.closePath();
    g.stroke({ width: 2, color: outlineColor || 0x000000, alpha: 0.3 });
  }, [tileColor, outlineColor, z, tileWidth, tileHeight]);

  return (
    <pixiContainer x={screenPos.x} y={screenPos.y}>
      <pixiGraphics draw={draw} />
    </pixiContainer>
  );
}
