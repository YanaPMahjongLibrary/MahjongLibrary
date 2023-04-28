import { GameSequenceBase } from "./GameSequenceBase";

/**
 * 普通の４人打ちルール
 */
export class BasicGameSequence extends GameSequenceBase {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }

  /**
   * ゲーム開始
   */
  start(): void {
    this.startRound();
  }
}
