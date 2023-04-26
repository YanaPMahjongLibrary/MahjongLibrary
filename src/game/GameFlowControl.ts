import type { IGameSequence } from "./GameSequence";

/**
 * ゲームフロー制御クラス
 */
export class GameFlowControl {
  /**
   * コンストラクタ
   * @param gameSequence ゲームシーケンス
   */
  constructor (private gameSequence: IGameSequence) {
    this.gameSequence.onInit(this);
  }
}
