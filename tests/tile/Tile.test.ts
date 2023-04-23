import { Tile } from "../../src/tile/Tile";
import { ETileKind, TileType } from "../../src/tile/TileType";

describe('Tile', () => {
  it('should create a new tile with the correct type', () => {
    const tile = new Tile(1, ETileKind.MANZU, false);
    expect(tile.type).toEqual(new TileType(0b00000001));
  });

  it('should clone a tile correctly', () => {
    const tile = new Tile(1, ETileKind.MANZU, false);
    const clonedTile = tile.clone();
    expect(clonedTile.type).toEqual(tile.type);
  });
});
