import { RuleBase } from "@src/rule/RuleBase";
import { RuleSetContext } from "@src/rule/RuleSet";
import { IYaku } from "@src/winning_hand/Yaku";

/**
 * 通知の基底クラス
 */
export abstract class NoticeBase extends Event {  
  private _ruleContext: RuleSetContext;
  private _yakuList: IYaku[];
  
  /**
   * コンストラクタ
   * @param noticeType 通知タイプ
   * @param rule ルールオブジェクト
   */
  constructor(noticeType: string, private rule: RuleBase) {
    super(noticeType);
    this._ruleContext = rule.getRuleSetContext();
    this._yakuList = rule.yakuList;
  }

  /**
   * ルール
   */
  get ruleContext(): RuleSetContext { return this._ruleContext; }

  /**
   * 採用役リスト
   */
  get yakuList(): IYaku[] { return this._yakuList.concat(); }
}
