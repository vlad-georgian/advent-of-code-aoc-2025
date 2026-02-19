import type { Tile, Inside, Direction } from '../shared.ts'

export type Edge = { start: Tile; end: Tile; direction: Direction; validSide: Inside }
