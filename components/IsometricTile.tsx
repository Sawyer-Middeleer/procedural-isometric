'use client';

import { useCallback } from 'react';
import type { Graphics } from 'pixi.js';
import type { IsometricTileProps } from '@/types/tile.types';
import { gridToScreen, darkenColor } from '@/lib/isometric-utils';

export function IsometricTile({ tile, config }: IsometricTileProps) {
  const { tileWidth, tileHeight } = config;
  const { gridX, gridY, z, color } = tile;

  // Convert grid coordinates to screen coordinates
  const screenPos = gridToScreen(gridX, gridY, z, config);

  // Draw callback for Graphics component
  const draw = useCallback((g: Graphics) => {
    g.clear();

    // Draw top face (diamond)
    g.beginFill(color);
    g.moveTo(0, -tileHeight / 2);
    g.lineTo(tileWidth / 2, 0);
    g.lineTo(0, tileHeight / 2);
    g.lineTo(-tileWidth / 2, 0);
    g.closePath();
    g.endFill();

    // Draw side faces if elevated
    if (z > 0) {
      // Left face (darkest)
      g.beginFill(darkenColor(color, 0.6));
      g.moveTo(-tileWidth / 2, 0);
      g.lineTo(0, tileHeight / 2);
      g.lineTo(0, tileHeight / 2 + z);
      g.lineTo(-tileWidth / 2, z);
      g.closePath();
      g.endFill();

      // Right face (medium)
      g.beginFill(darkenColor(color, 0.8));
      g.moveTo(tileWidth / 2, 0);
      g.lineTo(0, tileHeight / 2);
      g.lineTo(0, tileHeight / 2 + z);
      g.lineTo(tileWidth / 2, z);
      g.closePath();
      g.endFill();
    }

    // Optional: Draw outline for clarity
    g.lineStyle(2, 0x000000, 0.3);
    g.moveTo(0, -tileHeight / 2);
    g.lineTo(tileWidth / 2, 0);
    g.lineTo(0, tileHeight / 2);
    g.lineTo(-tileWidth / 2, 0);
    g.closePath();
    g.stroke();
  }, [color, z, tileWidth, tileHeight]);

  return (
    <pixiContainer x={screenPos.x} y={screenPos.y}>
      <pixiGraphics draw={draw} />
    </pixiContainer>
  );
}
