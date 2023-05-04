import { Fu } from "./Fu";
import { Han } from "./Han";

/**
 * 和了り点
 */
export class WinningScore {
  /**
   * コンストラクタ
   * @param _fu 符
   * @param _han 飜 
   */
  constructor(private _fu: Fu, private _han: Han) {
  }

  /**
   * 符
   */
  get fu(): Fu { return this._fu; }

  /**
   * 飜
   */
  get han(): Han { return this._han; }
}