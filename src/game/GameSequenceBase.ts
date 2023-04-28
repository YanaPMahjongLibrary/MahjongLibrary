import { BoardContext } from "./../context/BoardContext";
import { PlayerBase } from "../player/Player";

/**
 * ゲーム進行管理基底クラス
 */
export abstract class GameSequenceBase {
  private players: PlayerBase[];
  private _hash: string;
  private _playerHashes: string[];
  private _boardContext: BoardContext;

  /**
   * コンストラクタ
   */
  constructor(private maximumPlayerCount: number = 4) {
    this.players = [];

    // TODO: ハッシュの生成処理実装
    this._hash = "hoge";
    this._playerHashes = new Array(maximumPlayerCount).fill("hogehoge");

    this._boardContext = new BoardContext(this._hash, this._playerHashes);
  }

  join(player: PlayerBase) {
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
   * 場況コンテキスト
   */
  protected get boardContext(): BoardContext {
    return this._boardContext;
  }

  /**
   * コンテキスト操作用ハッシュ値
   */
  protected get hash(): string {
    return this._hash;
  }

  /**
   * プレイヤーのハッシュ
   */
  protected get playerHashes(): string[] {
    return this._playerHashes;
  }

  /**
   * 開始
   */
  abstract start(): void;

  /**
   * 局開始
   */
  protected startRound(): void {
    // プレイヤーコンテキストリセット
    for (let i = 0; i < this.maximumPlayerCount; i++) {
      this._boardContext.playerContexts[i].reset(this.hash);
    }

    // 洗牌
    const access = this._boardContext.stack.getAccess(this.hash);
    access.init();

    // 配牌
    for (let i = 0; i < 3; i < i++) {
      for (let j = 0; j < this.maximumPlayerCount; j++) {
        const playerAccess = this._boardContext.playerContexts[
          j
        ].hand.getAccess(this._playerHashes[j]);
        for (let k = 0; k < 4; k++) {
          const tile = access.pick();
          if (!tile) {
            // 何故か足りなかった
            throw Error("Unknown TileStack Count.");
          }
          playerAccess.tiles.push(tile);
        }
      }
    }
  }
}
