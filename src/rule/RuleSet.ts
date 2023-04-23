import { ICustomizableRule } from './CustomizableRule';

/**
 * ルールセット
 */
export class RuleSet {
  private rules: {[key: string]: ICustomizableRule} = {};

  /**
   * コンストラクタ
   */
  constructor () {
  }

  /**
   * ルール追加
   * @param name ルールの名前
   * @param rule ルールオブジェクト
   */
  addRule (name: string, rule: ICustomizableRule): void {
    this.rules[name] = rule;
  }

  /**
   * ルールの設定値を取得
   * @param name ルール名
   * @returns ルールの設定値
   */
  getRuleValue (name: string): any {
    if (!this.rules[name]) { throw new InvalidRuleError(name); }
    return this.rules[name].value;
  }

  setRuleValue (name: string, value: any): void {
    if (!this.rules[name]) { throw new InvalidRuleError(name); }
    this.rules[name].value = value;
  }
}

/**
 * 無効なルールを指定した時に発生するエラー
 */
export class InvalidRuleError extends Error {
  /**
   * コンストラクタ
   * @param ruleName ルール名
   */
  constructor (ruleName: string) {
    super(`Invalid rule: ${ruleName}`);
  }
}
