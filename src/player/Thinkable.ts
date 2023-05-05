import { TurnNotice } from "@src/notice/Notices";
import { Tile } from "@src/tile/Tile";

/**
 * プレイヤーの思考インタフェース
 * UIによるプレイヤー制御及びAIに実装する
 */
export interface IThinkable {
  /**
   * 切り番になった
   * TODO: 行動レスポンスの実装
   * @param hand 手牌
   * @param event イベント通知
   * @returns 行動レスポンス
   */
  onTurn(hand: Tile[], event: TurnNotice): Promise<void>;
}
