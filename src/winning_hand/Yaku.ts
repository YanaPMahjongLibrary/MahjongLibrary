import { Hand } from "@src/hand/Hand";

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

  // TODO: Boardクラスを実装したら解禁
  /**
   * 判定
   * @params hand 手牌
   * @params board 場況
   * @params rule ルール
   */
  //check(hand: Hand, board: Board, rule: RuleContext): boolean;
}
