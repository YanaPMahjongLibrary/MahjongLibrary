import { IRuleKeyValue } from './RuleKeyValue';
import { IYaku } from "@src/winning_hand/Yaku";
import { RuleSet, RuleSetContext } from "./RuleSet";

/**
 * ルールを表す基底クラス
 */
export abstract class RuleBase {
  /**
   * コンストラクタ
   * @param ruleSet ルールセット
   * @param _yakuList 採用役リスト
   */
  constructor(private ruleSet: RuleSet, private _yakuList: IYaku[]) {
  }

  /**
   * ルール追加
   * @param rule ルール
   */
  addRule(rule: IRuleKeyValue<any>): void {
    this.ruleSet.setRule(rule);
  }

  /**
   * ルールセットコンテキスト取得
   * @returns ルールセットコンテキスト
   */
  getRuleSetContext(): RuleSetContext {
    return this.ruleSet.makeContext();
  }

  /**
   * 採用役リスト
   */
  get yakuList(): IYaku[] { return this._yakuList.concat(); }
}
