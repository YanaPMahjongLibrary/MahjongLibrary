import { Hand } from "@src/hand/Hand";
import { IThinkable } from "./Thinkable";

/**
 * プレイヤークラス
 */
export class Player {
  private hand: Hand = new Hand();
  
  /**
   * コンストラクタ
   * @param think 思考インスタンス
   */
  constructor(private think: IThinkable) {}
}