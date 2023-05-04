import { RuleBase } from "@src/rule/RuleBase";
import { Tile } from "@src/tile/Tile";
import { Game } from "./Game";

/**
 * ゲームシーケンス基底クラス
 */
export abstract class GameSequenceBase {
  /**
   * コンストラクタ
   * @param ruleBase ルール基底クラス
   */
  constructor(protected ruleBase: RuleBase) {
  }
  
  /**
   * 牌山生成
   */
  abstract buildWall(): Tile[];

  /**
   * Gameオブジェクトがバインドされた
   */
  abstract onBindGame(game: Game): void;
}
