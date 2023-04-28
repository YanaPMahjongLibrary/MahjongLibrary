/**
 * 無効なルールを指定した時に発生するエラー
 */
export class InvalidRuleError extends Error {
  /**
   * コンストラクタ
   * @param ruleName ルール名
   */
  constructor(ruleName: string) {
    super(`Invalid rule: ${ruleName}`);
  }
}
