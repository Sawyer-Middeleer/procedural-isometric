// Type definitions for isometric tile system

export interface TileData {
  gridX: number;
  gridY: number;
  z: number;
  color: number;
  type?: string;
}

export interface ScreenCoordinates {
  x: number;
  y: number;
}

export interface TileConfig {
  tileWidth: number;
  tileHeight: number;
  tileDepth: number;
  originX: number;
  originY: number;
}

export interface IsometricTileProps {
  tile: TileData;
  config: TileConfig;
}

export interface IsometricGridProps {
  tiles: TileData[];
  config: TileConfig;
}
