import { Tile } from "../tile/Tile";

/**
 * 副露
 */
export class Meld {
  /**
   * コンストラクタ
   * @param _tiles 牌のセット
   * @param _from どこから鳴いたか
   */
  constructor(private _tiles: Tile[], private _from: number) {}

  /**
   * 牌のセット
   */
  get tiles(): Tile[] {
    return this._tiles.map((t) => t.clone());
  }

  /**
   * どこから鳴いたか
   */
  get from(): number {
    return this._from;
  }
}
