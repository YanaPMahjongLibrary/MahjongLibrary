import { Game } from "@src/game/Game";

/**
 * プレイヤーの思考インタフェース
 * UIによるプレイヤー制御及びAIに実装する
 */
export interface IThinkable {
  onJoin(game: Game): void
}
