import { GameSequenceBase } from "./GameSequence";

/**
 * ゲームクラス
 */
export class Game {
  private sequence: GameSequenceBase | null = null;

  /**
   * ゲームシーケンスをセット
   * @param sequence ゲームシーケンス実装オブジェクト
   */
  setSequence(sequence: GameSequenceBase): void {
    this.sequence = sequence;
    this.sequence.onBindGame(this);
  }

  /**
   * ゲーム開始
   */
  start(): void {
  }
}
