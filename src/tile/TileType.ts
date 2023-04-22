export module Tile {
  export enum ETileKind {
    MANZU = 0b00000000,
    PINZU = 0b00010000,
    SOZU = 0b00100000,
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
      this._kind = bitField & 0b110000;
      this._isRed = (bitField & 0b01000000) !== 0;
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
      return this._num | (this._kind << 4) || (this.isRed ? 1 : 0) << 6;
    }
  }
}
