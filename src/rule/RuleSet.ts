import type { IRuleKeyValue } from "./RuleKeyValue";

/**
 * ルールのセット
 */
export class RuleSet {
  private rules: {[key: string]: IRuleKeyValue<any>} = {};

  /**
   * ルールをセット
   * @param rule ルール
   */
  setRule(rule: IRuleKeyValue<any>): void {
    this.rules[rule.key] = rule;
  }

  /**
   * ルールセットコンテキストを生成
   * @returns ルールセットコンテキスト
   */
  makeContext(): RuleSetContext {
    return new RuleSetContext(this.rules);
  }
}

/**
 * ルールセットコンテキスト
 * RuleSetクラスのreadonlyなデータ
 */
export class RuleSetContext {
  /**
   * コンストラクタ
   * @param _rules ルールセットオブジェクト
   */
  constructor(private rules: {[key: string]: IRuleKeyValue<any>}) {
  }

  /**
   * ルールの設定値を取得
   * @param key キー
   * @returns 設定値
   */
  getRuleValue<T>(key: string): T {
    return this.rules[key].value() as T;
  }
}
