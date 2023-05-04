import type { EWind } from './../enums/index';
/**
 * 場風
 */
export class Wind {
  /**
   * コンストラクタ
   * @param _value 場風
   */
  constructor(private _value: EWind) {
  }

  /**
   * 場風
   */
  get value(): EWind { return this._value; }
}