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
   * 同じ牌かどうかを判定
   * ※プロパティは考慮しない
   * @param other 牌
   * @returns 同じ牌ならtrue
   */
  equal(other: Tile): boolean {
    return (this._type.kind === other._type.kind &&
            this._type.num === other._type.num);
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

  /**
   * この牌にオフセットをかけた牌を取得
   * 例： 五萬にオフセット２を渡したら七萬が返る
   * 
   * @param offset オフセット
   * @param loop ループするか？（ドラの判定で使用）
   */
  getOffsetTile(offset: number, loop: boolean = false): Tile | null {
    let num = this._type.num + offset;
    const {min, max} = ((num: number, kind: ETileKind) => {
      // 数牌
      if (kind !== ETileKind.JIHAI) { return {min: 1, max: 9}; }
      // 風牌
      if (num < 5) { return {min: 1, max: 4}; }
      // 三元牌
      return {min: 5, max: 7};
    })(this._type.num, this._type.kind);
    while (num < min || num > max) {
      if (!loop) { return null; }   // 存在しない牌
      if (num < min) {
        num += max - min + 1;
      } else {
        num -= max - min + 1;
      }
    }

    return new Tile(num, this._type.kind, 0);
  }
}
