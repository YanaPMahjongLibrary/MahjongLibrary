import { Tile } from "@src/tile/Tile";

/**
 * 副露を表すクラス
 */
export class Furo {
  /**
   * コンストラクタ
   * @param _tiles 牌の配列
   * @param _whose どこから鳴いたか
   * @param _isKakan 加槓か？
   */
  constructor(private _tiles: Tile[], private _whose: number, private _isKakan: boolean = false) {
  }

  /**
   * 牌の配列
   */
  get tiles(): Tile[] { return this._tiles.concat(); }

  /**
   * どこから鳴いたか
   */
  get whose(): number { return this._whose; }

  /**
   * 加槓か？
   */
  get isKakan(): boolean { return this._isKakan; }
}
