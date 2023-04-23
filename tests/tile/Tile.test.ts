import { Tile } from "../../src/tile/Tile";
import { TileType } from "../../src/tile/TileType";

describe('Tile', () => {
  it('should create a new tile with the correct type', () => {
    const tile = new Tile(0b00000001);
    expect(tile.type).toEqual(new TileType(0b00000001));
  });

  it('should clone a tile correctly', () => {
    const tile = new Tile(0b00000100);
    const clonedTile = tile.clone();
    expect(clonedTile.type).toEqual(tile.type);
  });
});
