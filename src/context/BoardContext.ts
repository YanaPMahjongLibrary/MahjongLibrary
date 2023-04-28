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
   * @param sequenceHash シーケンスの持つハッシュ値
   * @param playerHashes 全員分のハッシュ値
   */
  constructor(private sequenceHash: string, playerHashes: string[]) {
    this.playerHashes = playerHashes;

    // 本当はこうしたいけど・・・
    //this.reset()

    this._playerContexts = new Array(this.playerHashes.length).map(
      (_, index) => new PlayerContext(this.playerHashes[index], sequenceHash)
    );
    this._stack = new TileStack(this.sequenceHash);
  }

  /**
   * リセット
   */
  reset(): void {
    this._playerContexts = new Array(this.playerHashes.length).map(
      (_, index) =>
        new PlayerContext(this.playerHashes[index], this.sequenceHash)
    );
    this._stack = new TileStack(this.sequenceHash);
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
