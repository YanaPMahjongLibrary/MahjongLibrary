import { Hand } from "@src/hand/Hand";
import { IThinkable } from "./Thinkable";
import { StartGameNotice } from "@src/notice/Notices";

/**
 * プレイヤークラス
 */
export class Player {
  private hand: Hand = new Hand();
  
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
}