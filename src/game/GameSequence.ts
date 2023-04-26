import { GameFlowControl } from "./GameFlowControl";

/**
 * ゲームシーケンスインタフェース
 */
export interface IGameSequence {
  /**
   * 初期化された
   * @param sender イベント送信者
   */
  onInit(sender: GameFlowControl): void
}