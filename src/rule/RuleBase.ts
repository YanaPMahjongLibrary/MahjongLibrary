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
