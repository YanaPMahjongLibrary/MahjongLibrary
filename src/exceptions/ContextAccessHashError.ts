/**
 * コンテキストアクセスオブジェクト取得時にハッシュが食い違っていた時のエラー
 */
export class ContextdAccessHashError extends Error {
  constructor() {
    super("Not allowed get ContextAccess object.");
  }
}
