import { PlayerContext } from "./PlayerContext";
import { TileStack } from "./TileStack";

/**
 * 場況クラス
 */
export class BoardContext {
  private _playerContexts: PlayerContext[];
  private _stack: TileStack;
  private playerHashes: string[];

  /**
   * コンストラクタ
   * @param playerHashes 全員分のハッシュ値
   */
  constructor(playerHashes: string[]) {
    this.playerHashes = playerHashes;

    // 本当はこうしたいけど・・・
    //this.reset()

    this._playerContexts = new Array(this.playerHashes.length).map(
      (_, index) => new PlayerContext(this.playerHashes[index])
    );
    this._stack = new TileStack();
  }

  /**
   * リセット
   */
  reset(): void {
    this._playerContexts = new Array(this.playerHashes.length).map(
      (_, index) => new PlayerContext(this.playerHashes[index])
    );
    this._stack = new TileStack();
  }

  /**
   * プレイヤーコンテキスト
   */
  get playerContexts(): PlayerContext[] {
    return this._playerContexts;
  }

  /**
   * 牌山
   */
  get stack(): TileStack {
    return this._stack;
  }
}
