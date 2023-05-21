import { Hand } from "@src/hand/Hand";
import { IThinkable } from "./Thinkable";
import { StartGameNotice, StartRoundNotice } from "@src/notice/Notices";
import { Tile } from "@src/tile/Tile";
import { TurnResponse } from "@src/notice/Response";

/**
 * プレイヤークラス
 */
export class Player {
  private hand: Hand = new Hand([]);
  
  /**
   * コンストラクタ
   * @param think 思考インスタンス
   */
  constructor(private think: IThinkable) {}

  /**
   * ゲームが開始された
   * @param notice 通知
   */
  onStartGame(notice: StartGameNotice): void {
  }

  /**
   * 配牌をセット
   * @param tiles 配牌
   */
  setInitialHand(tiles: Tile[]): void {
    this.hand = new Hand(tiles);
  }

  /**
   * 局が開始された
   * @param notice 通知
   */
  onStartRound(notice: StartRoundNotice): void {
  }

  /**
   * 切り番
   * @param tail 自摸った牌。鳴いた後などでない場合はnull
   * @returns 行動レスポンスを返すPromise
   */
  onTurn(tile: Tile | null): Promise<TurnResponse> {
    return new Promise(resolve => {
      this.think.onTurn(this.hand.tiles, tile)
          .then(response => {
            // TODO: 不正な行動をしようとした際の補正処理実装
            resolve(response);
          });
    });
  }
}
