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
   * ルールコンテキスト生成
   * @returns ルールコンテキスト
   */
  makeContext(): RuleContext {
    return new RuleContext(this.ruleSet.makeContext(), this._yakuList);
  }
}

/**
 * ルールコンテキスト
 */
export class RuleContext {
  /**
   * コンストラクタ
   * @param _ruleSetContext ルールセットコンテキスト
   * @param _yakuList 役リスト
   */
  constructor(private _ruleSetContext: RuleSetContext, private _yakuList: IYaku[]) {}

  /**
   * ルールセットコンテキスト
   */
  get ruleSetContext(): RuleSetContext { return this._ruleSetContext; }

  /**
   * 役リスト
   */
  get yakuList(): IYaku[] { return this._yakuList.concat(); }
}
