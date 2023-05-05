import { RuleBase, RuleContext } from "@src/rule/RuleBase";
import { RuleSetContext } from "@src/rule/RuleSet";
import { IYaku } from "@src/winning_hand/Yaku";

/**
 * 通知の基底クラス
 */
export abstract class NoticeBase extends Event {  
  /**
   * コンストラクタ
   * @param noticeType 通知タイプ
   * @param rule ルールオブジェクト
   */
  constructor(noticeType: string, private _rule: RuleContext) {
    super(noticeType);
  }

  /**
   * ルール
   */
  get rule(): RuleContext { return this._rule; }
}
