export type Direction = 'left' | 'right' | 'up' | 'down' | undefined
export type Inside = 'left' | 'right' | undefined
export type Tile = { col: number; row: number }
export type Rectangle = { cornerA: Tile; cornerB: Tile; area: number }
