import { Hand } from "@src/hand/Hand";
import { IThinkable } from "./Thinkable";
import { StartGameNotice, StartRoundNotice } from "@src/notice/Notices";
import { Tile } from "@src/tile/Tile";

/**
 * プレイヤークラス
 */
export class Player {
  private hand: Hand = new Hand([]);
  
  /**
   * コンストラクタ
   * @param think 思考インスタンス
   */
  constructor(private think: IThinkable) {}

  /**
   * ゲームが開始された
   * @param notice 通知
   */
  onStartGame(notice: StartGameNotice): void {
  }

  /**
   * 配牌をセット
   * @param tiles 配牌
   */
  setInitialHand(tiles: Tile[]): void {
    this.hand = new Hand(tiles);
  }

  /**
   * 局が開始された
   * @param notice 通知
   */
  onStartRound(notice: StartRoundNotice): void {
  }
}