import { TileType } from "../../src/tile/TileType";
import { Enums } from "@src/enums";

describe("Enums.ETileKind", () => {
  it("should have correct bitwise values", () => {
    expect(Enums.ETileKind.MANZU).toBe(0b00000000);
    expect(Enums.ETileKind.PINZU).toBe(0b00010000);
    expect(Enums.ETileKind.SOZU).toBe(0b00100000);
    expect(Enums.ETileKind.JIHAI).toBe(0b00110000);
  });
});

describe("TileType", () => {
  describe("constructor", () => {
    it("should create a TileType instance with valid bitField", () => {
      const tile = new TileType(0b00011000);
      expect(tile.num).toBe(8);
      expect(tile.kind).toBe(Enums.ETileKind.PINZU);
      expect(tile.isRed).toBeFalsy();
    });

    it("should throw a TileKindError when passed bitField is invalid", () => {
      expect(() => new TileType(0b11111111)).toThrowError(
        "TileTypeに異常値が渡されました"
      );
      expect(() => new TileType(0b00001111)).toThrowError(
        "TileTypeに異常値が渡されました"
      );
    });
  });

  describe("serialize", () => {
    it("should return serialized bitField", () => {
      const tile = new TileType(0b00001000);
      expect(tile.serialize()).toBe(0b00001000);
    });
  });
});
