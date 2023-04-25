import { Tile } from "..";
import { ETileKind, TileType } from "../tile/TileType";

/**
 * 牌山クラス
 */
export class TileStack {
  private stack: number[]
  
  constructor () {
    this.stack = [];    
  }

  init () {
    this.stack.splice(0);
    
    // TODO: 赤牌の枚数をどこかから引っ張ってくる
    for (let num = 1; num <= 9; num++) {
      this.stack.push(...[
        TileType.serializeToBitField(num, ETileKind.MANZU, false),
        TileType.serializeToBitField(num, ETileKind.PINZU, false),
        TileType.serializeToBitField(num, ETileKind.SOZU, false),
      ]);
    }

    for (let ji = 1; ji <= 7; ji++) {
      this.stack.push(TileType.serializeToBitField(ji, ETileKind.JIHAI, false));
    }

    // 洗牌
    // TODO: メルセンヌツイスタとかに置き換えた方がいいかも
    for (let i = this.stack.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]];
    }
  }

  /**
   * 一枚自摸る
   * @returns 自摸った牌。自摸れる牌が無い場合はnullを返す
   */
  pick (): Tile | null {
    if (this.count <= 0) { return null; }
    
    let bf = this.stack[0];
    this.stack.splice(0, 1);
    return Tile.deserialize(bf);
  }

  /**
   * 王牌を考慮した残り枚数
   */
  get count (): number {
    return this.stack.length - 14;
  }
}
