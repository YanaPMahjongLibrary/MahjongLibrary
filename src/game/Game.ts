import { GameSequenceBase } from "./GameSequence";
import { Board } from "@src/board/Board";
import { Hand } from "@src/hand/Hand";
import { IThinkable } from "@src/player/Thinkable";

/**
 * ゲームクラス
 */
export class Game extends EventTarget {
  private sequence: GameSequenceBase | null = null;
  private players: IThinkable[] = [];
  private playerHands: Hand[] = [];
  private board: Board = new Board();

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
