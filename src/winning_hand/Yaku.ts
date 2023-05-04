import { BoardContext } from "@src/board/Board";
import { HandContext } from "@src/hand/Hand";
import { RuleSetContext } from "@src/rule/RuleSet";

/**
 * 役のインタフェース
 */
export interface IYaku {
  /**
   * 飜数
   */
  get han(): number;

  /**
   * 役の名前
   */
  get name(): string;

  /**
   * 役満か？
   */
  get isYakuman(): boolean;

  /**
   * 判定
   * @params hand 手牌
   * @params board 場況
   * @params rule ルール
   */
  check(hand: HandContext, board: BoardContext, rule: RuleSetContext): boolean;
}
