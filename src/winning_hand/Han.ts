/**
 * 飜数
 */
export class Han {
  /**
   * コンストラクタ
   * @param _value 飜数
   */
  constructor (private _value: number) {
    // 飜数は上限なしとする
    if (this._value <= 0 || !Number.isInteger(this._value)) { throw new Error("Invalid Han:" + this._value); }
  }

  /**
   * 飜数
   */
  get value(): number { return this._value; }
}