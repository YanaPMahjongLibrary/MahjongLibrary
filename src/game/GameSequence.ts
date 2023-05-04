import { Board } from "@src/board/Board";
import { Hand } from "@src/hand/Hand";
import { IThinkable } from "@src/player/Thinkable";
import { RuleBase } from "@src/rule/RuleBase";
import { Tile } from "@src/tile/Tile";
import { Game } from "./Game";

/**
 * ゲームシーケンス基底クラス
 */
export abstract class GameSequenceBase {
  /*
  protected board: Board;
  protected rule: RuleBase;
  protected players: IThinkable[];
  protected playerHands: Hand[];
  */

  /**
   * 牌山生成
   */
  abstract buildWall(): Tile[];

  /**
   * Gameオブジェクトがバインドされた
   */
  abstract onBindGame(game: Game): void;
}
