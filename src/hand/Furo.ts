import { InvalidFuroError } from "@src/errors/InvalidFuroError";
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
   * @param throwErrorOnInvalid 副露として成立していなければ例外を投げるか？
   */
  constructor(private _tiles: Tile[], private _whose: number, private _isKakan: boolean = false, throwErrorOnInvalid = true) {
    this._tiles = this._tiles.sort((t1, t2) => t1.type.num > t2.type.num ? 1 : -1);
    if (throwErrorOnInvalid && !this.checkValid()) { throw new InvalidFuroError(this._tiles); }
  }

  /**
   * 副露として成立しているか確認
   */
  checkValid(): boolean {
    if (this._tiles.length < 3 || this._tiles.length > 4) { return false; }   // そもそも面子として成立しない
    
    // 刻子もしくは槓子
    if (this._tiles.filter(t => t.equal(this._tiles[0])).length >= 3) {
      return true;
    }
    
    // 順子
    if (this._tiles.length === 3) {
      const t1 = this._tiles[0];
      const t2 = this._tiles[1];
      const t3 = this._tiles[2];
      if (t1.getOffsetTile(1)?.equal(t2) && t1.getOffsetTile(2)?.equal(t3)) {
        return true;
      }
    }

    // 成立していない
    return false;
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

  /**
   * 暗槓か？
   */
  get isAnkan(): boolean { return !this._isKakan && this._tiles.length === 4; }
}
