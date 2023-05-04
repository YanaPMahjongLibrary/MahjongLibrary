/**
 * 点数
 */
export class Points {
  /**
   * コンストラクタ
   * @param _value 点数
   */
  constructor(private _value: number) {
  }

  /**
   * 点数
   */
  get value(): number { return this._value;}
}