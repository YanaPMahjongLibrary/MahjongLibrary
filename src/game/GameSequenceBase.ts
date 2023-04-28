import { IPlayer } from "../player/Player";

/**
 * ゲーム進行管理基底クラス
 */
export abstract class GameSequenceBase {
  private players: IPlayer[];

  /**
   * コンストラクタ
   */
  constructor(private maximumPlayerCount: number = 4) {
    this.players = [];
  }

  join(player: IPlayer) {
    // 規定プレイヤー数以上の参加は許可しない
    if (this.players.length + 1 > this.maximumPlayerCount) {
      return;
    }

    this.players.push(player);
    if (this.players.length === this.maximumPlayerCount) {
      // プレイヤーが揃ったら開始する
      this.start();
    }
  }

  /**
   * 開始
   */
  abstract start(): void;
}
