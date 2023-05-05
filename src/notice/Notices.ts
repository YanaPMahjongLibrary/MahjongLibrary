import { RuleContext } from "@src/rule/RuleBase";
import { NoticeBase } from "./NoticeBase";

/**
 * ルールのキー
 */
export const ruleKeys = {
  startGame: "StartGame",
}

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

type StartGameEventListener = (event: StartGameNotice) => void;
export const addStartGameEventListener = (target: EventTarget, listener: StartGameEventListener) => {
  target.addEventListener(ruleKeys.startGame, listener as EventListener);
}
