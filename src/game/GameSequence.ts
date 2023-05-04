import { RuleBase } from "@src/rule/RuleBase";
import { Tile } from "@src/tile/Tile";
import { Game } from "./Game";
import { RuleSetContext } from "@src/rule/RuleSet";
import { IYaku } from "@src/winning_hand/Yaku";

/**
 * ゲームシーケンス基底クラス
 */
export abstract class GameSequenceBase {
  /**
   * コンストラクタ
   * @param ruleBase ルール基底クラス
   */
  constructor(private ruleBase: RuleBase) {
  }

  /**
   * ルールセットコンテキスト取得
   * @returns ルールセットコンテキスト
   */
  makeRuleSetContext(): RuleSetContext { return this.ruleBase.getRuleSetContext(); }

  /**
   * 採用役リスト
   */
  get yakuList(): IYaku[] { return this.ruleBase.yakuList; }

  /**
   * 牌山生成
   */
  abstract buildWall(): Tile[];

  /**
   * Gameオブジェクトがバインドされた
   */
  abstract onBindGame(game: Game): void;
}
