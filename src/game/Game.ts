import { GameSequenceBase } from "./GameSequence";
import { Board } from "@src/board/Board";
import { Player } from "@src/player/Player";
import { IThinkable } from "@src/player/Thinkable";
import { PointsRuleValue, requiredRuleKeys } from "@src/rule/RequiredRules";

/**
 * 次局に進む理由
 * ※前局の結果
 */
export enum ENextRoundReason {
  /**
   * 親が和了った
   */
  DEALER_WON,
  /**
   * 子が和了った
   */
  OPPONENT_WON,
  /**
   * 流局
   */
  NOBODY_WON,
}

/**
 * ゲームクラス
 */
export class Game extends EventTarget {
  private players: Player[] = [];
  private playerCount: number;
  private board: Board = new Board();

  /**
   * コンストラクタ
   * @param sequence ゲームシーケンス実装クラス
   */
  constructor(private sequence: GameSequenceBase) {
    super();
    this.sequence.onBindGame(this);
    const rules = this.sequence.makeRuleSetContext();
    this.playerCount = rules.getRuleValue<number>(requiredRuleKeys.playerCount)!;
  }

  /**
   * プレイヤー参加
   * @param think 思考オブジェクト
   */
  joinPlayer(think: IThinkable): void {
    if (this.players.length >= this.playerCount) { return; }
    
    this.players.push(new Player(think));
    // 揃ったら開始
    if (this.players.length === this.playerCount) {
      this.start();
    }
  }

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
    const rules = this.sequence.makeRuleSetContext();
    const wanpaiCount = rules.getRuleValue<number>(requiredRuleKeys.wanpaiCount)!;
    const points = rules.getRuleValue<PointsRuleValue>(requiredRuleKeys.points)!;
    this.board.initialize(wanpaiCount, this.playerCount, points.initial);
    this.reset();
  }

  /**
   * 次の局へ
   * @param renchan 連荘フラグ
   */
  toNextRound(reason: ENextRoundReason): void {
    const count = this.board.makeContext().counts.value;
    this.board.toNextRound(reason === ENextRoundReason.DEALER_WON);
    if (reason === ENextRoundReason.NOBODY_WON) {
      // 流れて一本積む
      // toNextRoundを呼び出した時点で内部的に０本場に戻るので、
      // キャッシュしておいた積み棒に１本加算した値を突っ込む
      this.board.addCount(count + 1);
    }
    this.reset();
  }

  /**
   * リセット
   */
  private reset(): void {
    const wallTiles = this.sequence.buildWall();
    this.board.resetWall(wallTiles);
  }
}
