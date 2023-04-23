import { TileType } from "./TileType";

/**
 * 牌を表すクラス
 */
export class Tile {
  // 牌の種類
  private _type: TileType

  /**
   * コンストラクタ
   * @param bitField 牌の種類を表すビットフィールド
   */
  constructor (bitField: number) {
    this._type = new TileType(bitField);
  }

  /**
   * 複製
   * @returns 同じ牌
   */
  clone(): Tile {
    return new Tile(this.type.serialize());
  }

  /**
   * 牌の種類
   */
  get type(): TileType { return this._type; }
}
