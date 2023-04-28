/**
 * プレイヤー基底クラス
 * AIクラス等はこれを継承する
 */
export abstract class PlayerBase {
  private handAccessHash: string;

  /**
   * コンストラクタ
   */
  constructor() {
    this.handAccessHash = "";
  }

  /**
   * 手牌アクセス用ハッシュ値セット
   * @param newHash 新しいハッシュ値
   */
  setHandAccessHash(newHash: string): void {
    this.handAccessHash = newHash;
  }
}
