import { RuleSet } from "./RuleSet";

/**
 * ルールを表す基底クラス
 */
export abstract class RuleBase {
  protected _ruleSet: RuleSet = new RuleSet();
  // TODO: 採用役の配列を追加(IYakuインタフェース定義後に行う)
}
