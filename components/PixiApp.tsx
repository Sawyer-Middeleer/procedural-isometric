'use client';

import { Application } from '@pixi/react';
import { IsometricGrid } from './IsometricGrid';
import { GRID_DATA } from '@/lib/tile-data';
import type { TileConfig } from '@/types/tile.types';
import '@/lib/pixi-extensions';

const CONFIG: TileConfig = {
  tileWidth: 100,
  tileHeight: 50,
  tileDepth: 30,
  originX: 400,
  originY: 400,
};

export default function PixiApp() {
  return (
    <Application
      width={800}
      height={600}
      backgroundColor={0x2c3e50}
      antialias={true}
    >
      <pixiContainer>
        <IsometricGrid tiles={GRID_DATA} config={CONFIG} />
      </pixiContainer>
    </Application>
  );
}
