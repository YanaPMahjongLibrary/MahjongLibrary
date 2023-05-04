/**
 * 符を表すクラス
 */
export class Fu {
  /**
   * コンストラクタ
   * @param _value 符（符ハネする前）
   */
  constructor(private _value: number) {
    // 符ハネ
    this._value = Math.floor((this._value + 9) / 10) * 10;
  }

  /**
   * 符ハネ後の値
   */
  get value(): number { return this._value; }
}
