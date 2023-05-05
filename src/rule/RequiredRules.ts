import { IRuleKeyValue } from "./RuleKeyValue";

/**
 * 必須ルールのキー
 */
export const requiredRuleKeys = {
  playerCount: "PlayerCount",
  wanpaiCount: "WanpaiCount",
  points: "InitialPoints",
}

/**
 * 点数設定
 * 例: 25000点持ちの30000点返し = {
 *  initial: 25000,
 *  returns: 30000,
 * }
 */
export interface PointsRuleValue {
  /**
   * 配給原点
   */
  initial: number;
  /**
   * 返し点
   */
  returns: number;
}

/**
 * プレイヤーの人数を表すルール
 */
export class PlayerCountRule implements IRuleKeyValue<number> {
  constructor(private _value: number = 4) {}
  
  get key(): string { return requiredRuleKeys.playerCount }
  get value(): number { return this._value; }
}

/**
 * 王牌の枚数ルール
 * ※N毎残し
 */
export class WanpaiCountRule implements IRuleKeyValue<number> {
  constructor(private _value: number = 14) {}

  get key(): string { return requiredRuleKeys.wanpaiCount; }
  get value(): number { return this._value; }
}

/**
 * 点数ルール
 */
export class InitialPointsRule implements IRuleKeyValue<PointsRuleValue> {
  constructor(private _value: PointsRuleValue = {
    initial: 25000, returns: 30000
  }) {}

  get key(): string { return requiredRuleKeys.points; }
  get value(): PointsRuleValue { return this._value; }  
}
