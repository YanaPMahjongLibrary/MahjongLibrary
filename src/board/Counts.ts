/**
 * 積み棒
 */
export class Counts {
  /**
   * コンストラクタ
   * @param _value 積み棒の本数
   */
  constructor(private _value: number) {
  }

  /**
   * 積み棒の本数
   */
  get value(): number { return this._value;}
}