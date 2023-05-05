import { RuleBase, RuleContext } from "@src/rule/RuleBase";
import { Tile } from "@src/tile/Tile";
import { Game } from "./Game";
import { IRuleKeyValue } from "@src/rule/RuleKeyValue";
import { InitialPointsRule, PlayerCountRule, WanpaiCountRule } from "@src/rule/RequiredRules";

/**
 * ゲームシーケンス基底クラス
 */
export abstract class GameSequenceBase {
  /**
   * コンストラクタ
   * @param ruleBase ルール基底クラス
   */
  constructor(private ruleBase: RuleBase) {
    this.appendRequiredRules(new PlayerCountRule());
    this.appendRequiredRules(new WanpaiCountRule());
    this.appendRequiredRules(new InitialPointsRule());
  }

  /**
   * ルールコンテキスト取得
   * @returns ルールセットコンテキスト
   */
  makeRuleContext(): RuleContext { return this.ruleBase.makeContext(); }

  /**
   * 牌山生成
   */
  abstract buildWall(): Tile[];

  /**
   * Gameオブジェクトがバインドされた
   */
  abstract onBindGame(game: Game): void;

  /**
   * 必須ルール追加
   */
  private appendRequiredRules<T>(rule: IRuleKeyValue<any>): void {
    if (this.makeRuleContext().ruleSetContext.getRuleValue(rule.key) === undefined) {
      this.ruleBase.addRule(rule);
    }
  }
}
