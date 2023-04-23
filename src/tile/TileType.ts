/**
 * 牌の種類
 */
export enum ETileKind {
  /**
   * 萬子
   */
  MANZU = 0b00000000,
  /**
   * 筒子
   */
  PINZU = 0b00010000,
  /**
   * 索子
   */
  SOZU = 0b00100000,
  /**
   * 字牌
   */
  JIHAI = 0b00110000,
}

/**
 * 牌の種類を表すクラス
 */
export class TileType {
  private _num: number;
  private _kind: ETileKind;
  private _isRed: boolean;

  /**
   * コンストラクタ
   * @param bitField ビットフィールド
   */
  constructor (bitField: number) {
    this._num = bitField & 0b1111;
    const kind = (bitField & 0b110000);
    this._isRed = (bitField & 0b1000000) !== 0;

    // 牌の種類バリデーション
    switch (kind) {
      case ETileKind.MANZU:
      case ETileKind.PINZU:
      case ETileKind.SOZU:
      case ETileKind.JIHAI:
        break
      default: throw new TileKindError(this._num, kind, bitField);
    }
    this._kind = kind;

    // 範囲のバリデーション
    if (this._kind === ETileKind.JIHAI) {
      if (this._num <= 0 || this._num >= 8) { throw new TileKindError(this._num, kind, bitField); }
    } else if (this._num <= 0 || this._num >= 10) { throw new TileKindError(this._num, kind, bitField); }
  }

  /**
   * 牌の数値
   */
  get num(): number { return this._num; }

  /**
   * 牌の種類
   */
  get kind(): ETileKind { return this._kind; }

  /**
   * 赤牌か
   */
  get isRed(): boolean { return this._isRed; }

  /**
   * シリアライズ
   * @returns シリアライズされたビットフィールド
   */
  serialize(): number {
    return this._num | this._kind || (this.isRed ? 1 : 0) << 6;
  }
}

/**
 * 牌の種類のバリデーションに失敗された時に投げられる例外
 */
export class TileKindError extends Error {
  constructor (private _num: number, private _kind: number, private _bitField: number) {
    super("TileTypeに異常値が渡されました");
  }

  /**
   * 牌の数値
   */
  get num(): number { return this._num; }

  /**
   * 牌の種類
   */
  get kind(): number { return this._kind; }

  /**
   * 元のビットフィールド
   */
  get bitField(): number { return this._bitField; }
}
