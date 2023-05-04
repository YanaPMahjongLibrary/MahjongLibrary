import { HandContext } from "@src/hand/Hand";
import { IYaku } from "./Yaku";
import { BoardContext } from "@src/board/Board";
import { RuleBase } from "@src/rule/RuleBase";
import { WinningScore } from "./WinningScore";
import { Fu } from "./Fu";
import { Han } from "./Han";

/**
 * 和了り点計算
 */
export class WinningScoreCalculator {
  /**
   * 生成
   * @param hand 手牌
   * @param yakus 採用役
   */
  static generate(hand: HandContext, board: BoardContext, rules: RuleBase): WinningScoreCalculator {
    return new WinningScoreCalculator(new WinningScore(new Fu(30), new Han(1)), []); // とりあえず仮で返しておく
  }

  constructor(private _score: WinningScore, private _yakus: IYaku[]) {
  }

  /**
   * 打点
   */
  get score(): WinningScore { return this._score; }

  /**
   * 成立役リスト
   */
  get yakus(): IYaku[] { return this._yakus.concat(); }
}