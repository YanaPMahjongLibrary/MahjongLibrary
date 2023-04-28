/**
 * プレイヤー基底クラス
 * AIクラス等はこれを継承する
 */
export abstract class PlayerBase {
  private handAccessHash: string;

  /**
   * コンストラクタ
   * @param index プレイヤーインデックス
   * @param handAccessHash 手牌アクセス用ハッシュ値
   */
  constructor(handAccessHash: string) {
    this.handAccessHash = handAccessHash;
  }
}
