// PixiJS v8 component registration
// Must be imported before using PixiJS components in JSX

import { extend } from '@pixi/react';
import { Container, Graphics, Sprite, Text } from 'pixi.js';

// Register PixiJS components for use in JSX
extend({ Container, Graphics, Sprite, Text });

// Export component names for reference
export const PixiComponents = {
  Container: 'pixiContainer',
  Graphics: 'pixiGraphics',
  Sprite: 'pixiSprite',
  Text: 'pixiText',
} as const;
