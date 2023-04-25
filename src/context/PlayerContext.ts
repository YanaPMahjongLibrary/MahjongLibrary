import { Discard } from "./Discard";
import { PlayerHand } from "./PlayerHand";

/**
 * プレイヤーコンテキスト
 */
export class PlayerContext {
  private _hand: PlayerHand;
  private _discard: Discard;

  constructor () {
    this._hand = new PlayerHand();
    this._discard = new Discard();
  }

  /**
   * プレイヤーの手
   */
  get hand(): PlayerHand { return this._hand; }

  /**
   * プレイヤーの捨て牌
   */
  get discard(): Discard { return this._discard; }
}
