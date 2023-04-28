import { Tile } from "../tile/Tile";
import { Meld } from "./Meld";

/**
 * プレイヤーの手を表すクラス
 * TODO: 手牌を制御する為のクラスを定義する
 *       ※「他人が勝手に牌を切った」とかが無いように、このクラスでそういったメソッドは実装しない
 *        　contextディレクトリ内にある定義は、全て「全プレイヤーが参照するもの」と言う認識を持っておく事
 */
export class PlayerHand {
  private _tiles: Tile[];
  private _melds: Meld[];

  /**
   * コンストラクタ
   */
  constructor() {
    this._tiles = [];
    this._melds = [];
  }

  /**
   * 鳴いた牌
   */
  get melds(): Meld[] {
    return this._melds;
  }
}
