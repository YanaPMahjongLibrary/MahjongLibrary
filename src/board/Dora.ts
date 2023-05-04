import { Tile } from "@src/tile/Tile";

/**
 * ドラクラス
 * ※王牌の中のドラ表示牌を指し、１つのインスタンスが表ドラと裏ドラを持つ
 */
export class Dora {
  /**
   * コンストラクタ
   * @param _face 表ドラ
   * @param _back 裏ドラ
   */
  constructor(private _face: Tile, private _back: Tile) {
  }

  /**
   * 表ドラ
   */
  get face(): Tile { return this._face; }

  /**
   * 裏ドラ
   */
  get back(): Tile { return this._back; }
}