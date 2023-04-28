import { Discard } from "./Discard";
import { PlayerHand } from "./PlayerHand";

/**
 * プレイヤーコンテキスト
 */
export class PlayerContext {
  private _hand: PlayerHand;
  private _discard: Discard;

  constructor(playerHash: string, sequenceHash: string) {
    this._hand = new PlayerHand(playerHash, sequenceHash);
    this._discard = new Discard(sequenceHash);
  }

  /**
   * プレイヤーの手
   */
  get hand(): PlayerHand {
    return this._hand;
  }

  /**
   * プレイヤーの捨て牌
   */
  get discard(): Discard {
    return this._discard;
  }

  /**
   * リセット
   * @param hash ハッシュ値
   */
  reset(hash: string): void {
    this._hand.reset(hash);
    this._discard.reset(hash);
  }
}
