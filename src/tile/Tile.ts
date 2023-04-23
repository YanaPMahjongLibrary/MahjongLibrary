import { TileType, ETileKind } from "./TileType";

/**
 * 牌を表すクラス
 */
export class Tile {
  private _type: TileType

  /**
   * デシリアライズ
   * @param bitField 牌の種類を表すビットフィールド
   * @returns 牌オブジェクト
   */
  static deserialize(bitField: number): Tile {
    const num = TileType.parseNumFromBitfield(bitField);
    const kind = TileType.parseKindFromBitfield(bitField);
    const isRed = TileType.parseIsRedFromBitfield(bitField);
    return new Tile(num, kind, isRed);
  }

  /**
   * コンストラクタ
   * @param bitField 牌の種類を表すビットフィールド
   */
  constructor (num: number, kind: ETileKind, isRed: boolean) {
    this._type = new TileType(TileType.serializeToBitField(num, kind, isRed));
  }

  /**
   * 複製
   * @returns 同じ牌
   */
  clone(): Tile {
    return new Tile(this._type.num, this._type.kind, this._type.isRed);
  }

  /**
   * 牌の種類
   */
  get type(): TileType { return this._type; }
}