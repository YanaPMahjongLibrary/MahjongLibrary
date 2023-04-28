/**
 * 牌の種類のバリデーションに失敗された時に投げられる例外
 */
export class TileKindError extends Error {
  constructor(
    private _num: number,
    private _kind: number,
    private _bitField: number
  ) {
    super("TileTypeに異常値が渡されました");
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
  get kind(): number {
    return this._kind;
  }

  /**
   * 元のビットフィールド
   */
  get bitField(): number {
    return this._bitField;
  }
}
