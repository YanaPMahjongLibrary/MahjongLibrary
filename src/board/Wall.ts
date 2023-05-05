import { Tile } from "@src/tile/Tile";

/**
 * 牌山クラス
 */
export class Wall {
  /**
   * 牌山
   * @param tiles 洗牌済みの牌の配列
   */
  constructor(private tiles: Tile[]) {
  }

  /**
   * 自摸る
   * @returns 自摸った牌。持ってくる牌が無いならnull
   */
  pick(): Tile | null {
    if (this.tiles.length === 0) { return null; }
    
    const t = this.tiles[0].clone();
    this.tiles.splice(0, 1);
    return t;
  }

  /**
   * 複数枚自摸る
   * @param count 自摸る枚数
   */
  pickMultiple(count: number): Tile[] {
    const tiles: Tile[] = [];
    for (let i = 0 ; i < count; i++) {
      const tile = this.pick();
      if (tile === null) { throw new Error("Fail Pick Multiple"); }
      tiles.push(tile);
    }
    return tiles;
  }

  /**
   * 王牌用に牌を持ってくる
   * @returns 持ってきた牌。持ってくる牌が無いならnull
   */
  pickForWanpai(): Tile | null {
    return this.tiles.pop()?.clone() ?? null;
  }

  /**
   * 残り枚数
   */
  get count(): number { return this.tiles.length; }
}
