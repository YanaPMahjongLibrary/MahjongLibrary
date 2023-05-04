import { Tile } from "@src/tile/Tile";

/**
 * 無効な副露が生成された時に投げる例外
 */
export class InvalidFuroError extends Error {
  /**
   * コンストラクタ
   * @param _tiles 構成牌
   */
  constructor(private _tiles: Tile[]) {
    super("Invalid Furo");
  }

  /**
   * 構成牌
   */
  get tiles(): Tile[] { return this._tiles.concat(); }
}
