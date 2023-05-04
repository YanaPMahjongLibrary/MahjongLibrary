import { EWind } from "@src/enums";

/**
 * 場風と局数
 * 例：東一局
 */
export class Round {
  /**
   * コンストラクタ
   * @param _wind 場風
   * @param _roundNum 局数
   */
  constructor(private _wind: EWind, private _roundNum: number) {
  }

  /**
   * 場風
   */
  get wind(): EWind { return this._wind; }

  /**
   * 局数
   */
  get roundNum(): number { return this._roundNum; }
}
