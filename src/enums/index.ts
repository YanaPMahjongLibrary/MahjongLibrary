export namespace Enums {
  /**
   * 風
   */
  export enum EWind {
    /**
     * 東
     */
    EAST,
    /**
     * 南
     */
    SOUTH,
    /**
     * 西
     */
    WEST,
    /**
     * 北
     */
    NORTH,
  }

  /**
   * 牌の種類
   */
  export enum ETileKind {
    /**
     * 萬子
     */
    MANZU = 0b00000000,
    /**
     * 筒子
     */
    PINZU = 0b00010000,
    /**
     * 索子
     */
    SOZU = 0b00100000,
    /**
     * 字牌
     */
    JIHAI = 0b00110000,
  }
}
