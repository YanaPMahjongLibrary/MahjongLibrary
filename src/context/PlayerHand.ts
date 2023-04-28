import { Tile } from "../tile/Tile";
import { Meld } from "./Meld";
import { ContextAccessHashError } from "../errors/ContextAccessHashError";

/**
 * プレイヤーの手を表すクラス
 */
export class PlayerHand {
  private _tiles: Tile[];
  private _melds: Meld[];

  /**
   * コンストラクタ
   * @param playerHash 手牌制御用のハッシュ値
   * @param sequenceHash シーケンスのハッシュ値。リセットに使用
   */
  constructor(private playerHash: string, private sequenceHash: string) {
    this._tiles = [];
    this._melds = [];
  }

  /**
   * 手牌を参照するためのオブジェクトを取得
   * @param hash ハッシュ
   * @returns 手牌オブジェクト
   * @throws ContextdAccessHashError ハッシュ値が食い違っていたらこの例外がthrowされる
   */
  getAccess(hash: string) {
    if (this.playerHash !== hash) {
      throw new ContextAccessHashError();
    }
    return new PlayerHandAccess(this._tiles, this._melds);
  }

  /**
   * リセット
   * @param hash シーケンスの持つハッシュ値
   */
  reset(hash: string): void {
    if (this.sequenceHash !== hash) {
      throw new ContextAccessHashError();
    }

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
  private _melds: Meld[];

  /**
   * コンストラクタ
   * @param tiles 手牌の配列
   * @param melds 鳴きの配列
   */
  constructor(tiles: Tile[], melds: Meld[]) {
    this._tiles = tiles;
    this._melds = melds;
  }

  /**
   * 手牌
   */
  get tiles(): Tile[] {
    return this._tiles.map((t) => t.clone());
  }

  /**
   * 鳴き
   */
  get melds(): Meld[] {
    return this._melds;
  }
}
