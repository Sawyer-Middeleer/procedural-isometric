'use client';

import { useCallback } from 'react';
import type { Graphics } from 'pixi.js';
import type { IsometricTileProps } from '@/types/tile.types';
import { gridToScreen, darkenColor } from '@/lib/isometric-utils';
import { TILE_TYPES } from '@/lib/tile-data';

export function IsometricTile({ tile, config }: IsometricTileProps) {
  const { tileWidth, tileHeight } = config;
  const { gridX, gridY, z, type, height, color, outlineColor } = tile;

  // Derive color from type if not explicitly provided
  const tileColor = color ?? TILE_TYPES[type as keyof typeof TILE_TYPES] ?? 0xffffff;

  // Use height for side thickness; fallback to z only for legacy tiles
  const sideHeight = height ?? z;

  // Treat `z` as the base elevation; draw the top face at z + height
  const topZ = z + (height ?? 0);

  // Convert grid coordinates to screen coordinates for the TOP face
  const screenPos = gridToScreen(gridX, gridY, topZ, config);

  // Draw callback for Graphics component
  const draw = useCallback((g: Graphics) => {
    g.clear();

    // Draw side faces first so the top face occludes them
    if (sideHeight > 0) {
      // Left face (darkest)
      g.moveTo(-tileWidth / 2, 0);
      g.lineTo(0, tileHeight / 2);
      g.lineTo(0, tileHeight / 2 + sideHeight);
      g.lineTo(-tileWidth / 2, sideHeight);
      g.closePath();
      g.fill(darkenColor(tileColor, 0.4));

      // Right face (medium)
      g.moveTo(tileWidth / 2, 0);
      g.lineTo(0, tileHeight / 2);
      g.lineTo(0, tileHeight / 2 + sideHeight);
      g.lineTo(tileWidth / 2, sideHeight);
      g.closePath();
      g.fill(darkenColor(tileColor, 0.6));
    }

    // Draw top face (diamond) last
    g.moveTo(0, -tileHeight / 2);
    g.lineTo(tileWidth / 2, 0);
    g.lineTo(0, tileHeight / 2);
    g.lineTo(-tileWidth / 2, 0);
    g.closePath();
    g.fill(tileColor);

    // Subtle outline for clarity (applied once)
    g.moveTo(0, -tileHeight / 2);
    g.lineTo(tileWidth / 2, 0);
    g.lineTo(0, tileHeight / 2);
    g.lineTo(-tileWidth / 2, 0);
    g.closePath();
    g.stroke({ width: 2, color: outlineColor, alpha: 0.3 });
  }, [tileColor, outlineColor, sideHeight, tileWidth, tileHeight]);

  return (
    <pixiContainer x={screenPos.x} y={screenPos.y}>
      <pixiGraphics draw={draw} />
    </pixiContainer>
  );
}
