import { Tile } from "@src/tile/Tile";
import { Furo } from "./Furo";

/**
 * プレイヤーの手を表すクラス
 */
export class Hand {
  private _tiles: Tile[] = [];
  private _furos: Furo[] = [];

  /**
   * 手牌
   */
  get tiles(): Tile[] { return this._tiles.concat(); }

  /**
   * 副露
   */
  get furos(): Furo[] { return this._furos.concat(); }

  /**
   * 牌を追加
   * @param tile 追加する牌
   */
  add(tile: Tile): void {
    this._tiles.push(tile);
  }

  /**
   * 牌を取り除く
   * @param index 取り除く牌のインデックス
   */
  remove(index: number): void {
    this._tiles.splice(index, 1);
  }

  /* TODO: 副露関係の実装 */
}
