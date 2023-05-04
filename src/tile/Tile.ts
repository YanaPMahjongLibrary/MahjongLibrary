import { TileType } from "./TileType";
import { ETileKind } from "../enums";
import { TileProperty } from "./TileProperty";

/**
 * 牌を表すクラス
 */
export class Tile {
  private _type: TileType;
  private _property: TileProperty

  /**
   * デシリアライズ
   * @param bitField 牌の種類を表すビットフィールド
   * @param propertyBitField プロパティを表すビットフィールド
   * @returns 牌オブジェクト
   */
  static deserialize(bitField: number, propertyBitField: number = 0): Tile {
    const num = TileType.parseNumFromBitfield(bitField);
    const kind = TileType.parseKindFromBitfield(bitField);
    return new Tile(num, kind, propertyBitField);
  }

  /**
   * コンストラクタ
   * @param num 牌の数字
   * @param kind 牌の種類
   * @param propertyBitField プロパティを表すビットフィールド
   */
  constructor(num: number, kind: ETileKind, propertyBitField: number) {
    this._type = new TileType(TileType.serializeToBitField(num, kind));
    this._property = new TileProperty(propertyBitField);
  }

  /**
   * 複製
   * @returns 同じ牌
   */
  clone(): Tile {
    return new Tile(this._type.num, this._type.kind, this._property.bits);
  }

  /**
   * 牌の種類
   */
  get type(): TileType {
    return this._type;
  }

  /**
   * 牌のプロパティ
   */
  get property(): TileProperty { return this._property; }
}
