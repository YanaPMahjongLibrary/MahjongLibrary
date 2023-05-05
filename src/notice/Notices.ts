import { RuleContext } from "@src/rule/RuleBase";
import { NoticeBase } from "./NoticeBase";
import { Tile } from "@src/tile/Tile";

/**
 * ルールのキー
 */
export const ruleKeys = {
  startGame: "StartGame",
  startRound: "StartRound",
  turn: "Turn",
}

type NoticeEventListener<T extends NoticeBase> = (event: T) => void;

/**
 * ゲーム開始通知
 */
export class StartGameNotice extends NoticeBase {
  /**
   * コンストラクタ
   * @param rule ルールコンテキスト
   */
  constructor(rule: RuleContext) {
    super(ruleKeys.startGame, rule);
  }
}

type StartGameEventListener = NoticeEventListener<StartGameNotice>;
export const addStartGameEventListener = (target: EventTarget, listener: StartGameEventListener) => {
  target.addEventListener(ruleKeys.startGame, listener as EventListener);
};

/**
 * 局開始通知
 */
export class StartRoundNotice extends NoticeBase {
  /**
   * コンストラクタ
   * @param rule ルールコンテキスト
   */
  constructor(rule: RuleContext) {
    super(ruleKeys.startGame, rule);
  }
}

type StartRoundEventListener = NoticeEventListener<StartRoundNotice>;
export const addStartRoundEventListener = (target: EventTarget, listener: StartRoundEventListener) => {
  target.addEventListener(ruleKeys.startGame, listener as EventListener);
};

/**
 * 切り番通知
 */
export class TurnNotice extends NoticeBase {
  /**
   * コンストラクタ
   * @param _tile 自摸った牌。鳴いて自摸牌が無い場合はnull
   * @param rule ルールコンテキスト
   */
  constructor(private _tile: Tile | null, rule: RuleContext) {
    super(ruleKeys.turn, rule);
  }

  /**
   * 自摸った牌。鳴いて自摸牌が無い場合はnull
   */
  get tile(): Tile | null { return this._tile; }
}

type TurnEventListener = NoticeEventListener<TurnNotice>;
export const addTurnEventListener = (target: EventTarget, listener: TurnEventListener) => {
  target.addEventListener(ruleKeys.startGame, listener as EventListener);
};
