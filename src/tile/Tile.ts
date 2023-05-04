import { TileType } from "./TileType";
import { Enums } from "../enums";

/**
 * 牌を表すクラス
 */
export class Tile {
  private _type: TileType;

  /**
   * デシリアライズ
   * @param bitField 牌の種類を表すビットフィールド
   * @returns 牌オブジェクト
   */
  static deserialize(bitField: number): Tile {
    const num = TileType.parseNumFromBitfield(bitField);
    const kind = TileType.parseKindFromBitfield(bitField);
    return new Tile(num, kind);
  }

  /**
   * コンストラクタ
   * @param bitField 牌の種類を表すビットフィールド
   */
  constructor(num: number, kind: Enums.ETileKind) {
    this._type = new TileType(TileType.serializeToBitField(num, kind));
  }

  /**
   * 複製
   * @returns 同じ牌
   */
  clone(): Tile {
    return new Tile(this._type.num, this._type.kind);
  }

  /**
   * 牌の種類
   */
  get type(): TileType {
    return this._type;
  }
}
