import { TurnResponse } from "@src/notice/Response";
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
   * @param tail 自摸った牌。鳴いた後などでない場合はnull
   * @returns 行動レスポンス
   */
  onTurn(hand: Tile[], tile: Tile | null): Promise<TurnResponse>;
}
