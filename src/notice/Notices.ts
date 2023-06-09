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
