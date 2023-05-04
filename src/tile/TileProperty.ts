/**
 * 牌のプロパティ
 */
export class TileProperty {
  /**
   * コンストラクタ
   * @param propertyBitField プロパティを表すビットフィールド
   */
  constructor(private propertyBitField: number) {
  }

  /**
   * 指定のプロパティを持っているか？
   * @param propertyBit プロパティを表すビットフィールド
   * @returns プロパティが有効か？
   */
  hasProperty(propertyBit: number): boolean {
    return (this.propertyBitField & propertyBit) !== 0;
  }

  /**
   * 生のビットフィールド
   */
  get bits(): number { return this.propertyBitField; }
}
