import { PlayerContext } from "./PlayerContext";
import { TileStack } from "./TileStack";

/**
 * 場況クラス
 */
export class BoardContext {
  private _playerContexts: PlayerContext[]
  private _stack: TileStack;

  constructor () {
    // 本当はこうしたいけど・・・
    //this.reset()
    
    this._playerContexts = new Array(4).map(_ => new PlayerContext());
    this._stack = new TileStack();
  }

  /**
   * リセット
   */
  reset(): void {
    this._playerContexts = new Array(4).map(_ => new PlayerContext());
    this._stack = new TileStack();
  }

  /**
   * プレイヤーコンテキスト
   */
  get playerContexts(): PlayerContext[] { return this._playerContexts; }

  /**
   * 牌山
   */
  get stack(): TileStack { return this._stack; }
}