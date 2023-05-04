import { TileKindError } from "../errors/TileKindError";
import { ETileKind } from "../enums";

/**
 * 牌の種類を表すクラス
 */
export class TileType {
  private _num: number;
  private _kind: ETileKind;

  /**
   * ビットフィールドへのシリアライズ
   * @param num 数字
   * @param kind 種類
   * @param isRed 赤牌か？
   */
  static serializeToBitField(
    num: number,
    kind: ETileKind
  ): number {
    return num | kind;
  }

  /**
   * ビットフィールドから牌の数字に変換
   * @param bitField ビットフィールド
   * @returns 牌の数字
   */
  static parseNumFromBitfield(bitField: number): number {
    return bitField & 0b1111;
  }

  /**
   * ビットフィールドから牌の種類に変換
   * @param bitField ビットフィールド
   * @returns 牌の種類
   */
  static parseKindFromBitfield(bitField: number): ETileKind {
    return bitField & 0b110000;
  }

  /**
   * コンストラクタ
   * @param bitField ビットフィールド
   */
  constructor(bitField: number) {
    this._num = TileType.parseNumFromBitfield(bitField);
    const kind = TileType.parseKindFromBitfield(bitField);
  
    // 牌の種類バリデーション
    switch (kind) {
      case ETileKind.MANZU:
      case ETileKind.PINZU:
      case ETileKind.SOZU:
      case ETileKind.JIHAI:
        break;
      default:
        throw new TileKindError(this._num, kind, bitField);
    }
    this._kind = kind;

    // 範囲のバリデーション
    if (this._kind === ETileKind.JIHAI) {
      if (this._num <= 0 || this._num >= 8) {
        throw new TileKindError(this._num, kind, bitField);
      }
    } else if (this._num <= 0 || this._num >= 10) {
      throw new TileKindError(this._num, kind, bitField);
    }
  }

  /**
   * 牌の数値
   */
  get num(): number {
    return this._num;
  }

  /**
   * 牌の種類
   */
  get kind(): ETileKind {
    return this._kind;
  }

  /**
   * シリアライズ
   * @returns シリアライズされたビットフィールド
   */
  serialize(): number {
    return TileType.serializeToBitField(this._num, this._kind);
  }
}
