import { Tile } from "@src/tile/Tile";

/**
 * 捨て牌クラス
 */
export class Discard {
  private _tiles: Tile[] = [];

  /**
   * 牌リスト
   */
  get tiles(): Tile[] { return this._tiles.concat(); }

  /**
   * 追加
   * @param tile 追加する牌
   */
  add(tile: Tile): void {
    this._tiles.push(tile);
  }
}