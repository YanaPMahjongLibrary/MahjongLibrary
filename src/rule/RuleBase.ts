import { IYaku } from "@src/winning_hand/Yaku";
import { RuleSet } from "./RuleSet";

/**
 * ルールを表す基底クラス
 */
export abstract class RuleBase {
  /**
   * ルールセット
   */
  protected _ruleSet: RuleSet = new RuleSet();
  
  /**
   * 採用役リスト
   */
  protected _yakuList: IYaku[] = [];
}
