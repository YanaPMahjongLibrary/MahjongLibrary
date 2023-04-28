import { TileKindError } from "../errors/TileKindError";
import { Enums } from "../enums";

/**
 * 牌の種類を表すクラス
 */
export class TileType {
  private _num: number;
  private _kind: Enums.ETileKind;
  private _isRed: boolean;

  /**
   * ビットフィールドへのシリアライズ
   * @param num 数字
   * @param kind 種類
   * @param isRed 赤牌か？
   */
  static serializeToBitField(
    num: number,
    kind: Enums.ETileKind,
    isRed: boolean
  ): number {
    return num | kind || (isRed ? 1 : 0) << 6;
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
  static parseKindFromBitfield(bitField: number): Enums.ETileKind {
    return bitField & 0b110000;
  }
  /**
   * ビットフィールドから赤牌フラグに変換
   * @param bitField ビットフィールド
   * @returns 赤牌フラグ
   */
  static parseIsRedFromBitfield(bitField: number): boolean {
    return (bitField & 0b1000000) !== 0;
  }

  /**
   * コンストラクタ
   * @param bitField ビットフィールド
   */
  constructor(bitField: number) {
    this._num = TileType.parseNumFromBitfield(bitField);
    const kind = TileType.parseKindFromBitfield(bitField);
    this._isRed = TileType.parseIsRedFromBitfield(bitField);

    // 牌の種類バリデーション
    switch (kind) {
      case Enums.ETileKind.MANZU:
      case Enums.ETileKind.PINZU:
      case Enums.ETileKind.SOZU:
      case Enums.ETileKind.JIHAI:
        break;
      default:
        throw new TileKindError(this._num, kind, bitField);
    }
    this._kind = kind;

    // 範囲のバリデーション
    if (this._kind === Enums.ETileKind.JIHAI) {
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
  get kind(): Enums.ETileKind {
    return this._kind;
  }

  /**
   * 赤牌か
   */
  get isRed(): boolean {
    return this._isRed;
  }

  /**
   * シリアライズ
   * @returns シリアライズされたビットフィールド
   */
  serialize(): number {
    return TileType.serializeToBitField(this._num, this._kind, this._isRed);
  }
}
