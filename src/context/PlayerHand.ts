import { Tile } from "../tile/Tile";
import { Meld } from "./Meld";
import { ContextdAccessHashError } from "../errors/ContextAccessHashError";

/**
 * プレイヤーの手を表すクラス
 */
export class PlayerHand {
  private _tiles: Tile[];
  private _melds: Meld[];
  private hash: string;

  /**
   * コンストラクタ
   * @param hash 手牌制御用のハッシュ値
   */
  constructor(hash: string) {
    this._tiles = [];
    this._melds = [];
    this.hash = hash;
  }

  /**
   * 手牌を参照するためのオブジェクトを取得
   * @param hash ハッシュ
   * @returns 手牌オブジェクト
   * @throws ContextdAccessHashError ハッシュ値が食い違っていたらこの例外がthrowされる
   */
  getHandAccess(hash: string) {
    if (this.hash !== hash) {
      throw new ContextdAccessHashError();
    }
    return new PlayerHandAccess(this._tiles);
  }

  /**
   * リセット
   */
  reset(): void {
    this._tiles.splice(0);
    this._melds.splice(0);
  }

  /**
   * 鳴いた牌
   */
  get melds(): Meld[] {
    return this._melds;
  }
}

/**
 * プレイヤーの手牌へのアクセス
 */
export class PlayerHandAccess {
  private _tiles: Tile[];

  /**
   * コンストラクタ
   * @param tiles 手牌の配列
   */
  constructor(tiles: Tile[]) {
    this._tiles = tiles;
  }

  /**
   * 手牌
   */
  get tiles(): Tile[] {
    return this._tiles.map((t) => t.clone());
  }
}
