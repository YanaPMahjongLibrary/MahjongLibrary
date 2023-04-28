import { Tile } from "../tile/Tile";

/**
 * 捨て牌クラス
 */
export class Discard {
  private _tiles: Tile[];

  constructor() {
    this._tiles = [];
  }

  /**
   * 捨て牌
   */
  get tiles(): Tile[] {
    return this._tiles.map((t) => t.clone());
  }
}
