/**
 * プレイヤー基底クラス
 * AIクラス等はこれを継承する
 */
export abstract class PlayerBase {
  private _index: number;
  private handAccessHash: string;

  /**
   * コンストラクタ
   * @param index プレイヤーインデックス
   * @param handAccessHash 手牌アクセス用ハッシュ値
   */
  constructor(index: number, handAccessHash: string) {
    this._index = index;
    this.handAccessHash = handAccessHash;
  }

  /**
   * プレイヤーインデックス
   */
  get index(): number {
    return this._index;
  }
}
