import { StartGameNotice, StartRoundNotice, addStartGameEventListener } from "@src/notice/Notices";
import { GameSequenceBase } from "./GameSequence";
import { Board } from "@src/board/Board";
import { Player } from "@src/player/Player";
import { IThinkable } from "@src/player/Thinkable";
import { PointsRuleValue, requiredRuleKeys } from "@src/rule/RequiredRules";
import { Tile } from "@src/tile/Tile";

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
    const rules = this.sequence.makeRuleContext();
    this.playerCount = rules.ruleSetContext.getRuleValue<number>(requiredRuleKeys.playerCount)!;
  }

  /**
   * プレイヤー参加
   * @param think 思考オブジェクト
   */
  joinPlayer(think: IThinkable): void {
    if (this.players.length >= this.playerCount) { return; }
    
    const player = new Player(think);
    addStartGameEventListener(this, player.onStartGame.bind(player));
    
    this.players.push(player);
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
    // 起家決め
    // プレイヤーの配列をランダムにソートし、インデックス0が起家となる
    for (let i = this.playerCount - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.players[i], this.players[j]] = [this.players[i], this.players[j]];
    }
    
    // ルール設定
    const rule = this.sequence.makeRuleContext();
    const ruleSet = rule.ruleSetContext;
    const wanpaiCount = ruleSet.getRuleValue<number>(requiredRuleKeys.wanpaiCount)!;
    const points = ruleSet.getRuleValue<PointsRuleValue>(requiredRuleKeys.points)!;
    this.board.initialize(wanpaiCount, this.playerCount, points.initial);
    this.reset();

    // 通知
    this.dispatchEvent(new StartGameNotice(rule));
    this.startRound();
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
    this.startRound();
  }

  /**
   * 局を開始
   */
  private startRound(): void {
    // 配牌
    const tiles: Tile[][] = new Array<Tile[]>(4);
    for (let i = 0; i < this.playerCount; i++) {
      for (let j = 0; j < 3; j++) {
        tiles[i].concat(this.board.pickMultiple(4));
      }
    }
    for (let i = 0; i < 3; i++) {
      const tile = this.board.pick();
      if (tile === null) { throw new Error("Start Round Failed. Wall is not enougth."); }
      tiles[i].push(tile);
      this.players[i].setInitialHand(tiles[i]);
    }

    // 通知
    this.dispatchEvent(new StartRoundNotice(this.sequence.makeRuleContext()));

    // TODO: 親の切り番から開始
  }

  /**
   * リセット
   */
  private reset(): void {
    const wallTiles = this.sequence.buildWall();
    this.board.resetWall(wallTiles);
  }
}
