import { ContextAccessHashError } from "@src/errors/ContextAccessHashError";
import { Tile } from "../tile/Tile";

/**
 * 捨て牌クラス
 */
export class Discard {
  private _tiles: Tile[];

  /**
   * コンストラクタ
   * @param resetHash リセットに必要なハッシュ値
   */
  constructor(private resetHash: string) {
    this._tiles = [];
  }

  /**
   * 捨て牌
   */
  get tiles(): Tile[] {
    return this._tiles.map((t) => t.clone());
  }

  /**
   * リセット
   * @param hash リセット用ハッシュ
   */
  reset(hash: string): void {
    if (this.resetHash !== hash) {
      throw new ContextAccessHashError();
    }

    this._tiles.splice(0);
  }
}
