import { ContextAccessHashError } from "@src/errors/ContextAccessHashError";
import { Tile } from "../tile/Tile";
import { TileType } from "../tile/TileType";
import { Enums } from "../enums";

/**
 * 牌山クラス
 */
export class TileStack {
  private stack: number[];

  /**
   * コンストラクタ
   * @param hash アクセスオブジェクト取得用ハッシュ
   */
  constructor(private hash: string) {
    this.stack = [];
  }

  /**
   * 牌山アクセスオブジェクト取得
   * @param hash ハッシュ値
   * @returns 牌山アクセスオブジェクト
   * @throws ContextAccessHashError ハッシュ値の検証に失敗した場合にthrowされる
   */
  getAccess(hash: string) {
    if (this.hash !== hash) {
      throw new ContextAccessHashError();
    }
    return new TileStackAccess(this.stack);
  }

  /**
   * 王牌を考慮した残り枚数
   */
  get count(): number {
    return this.stack.length - 14;
  }
}

/**
 * 牌山へのアクセスクラス
 */
export class TileStackAccess {
  /**
   * コンストラクタ
   * @param stack 牌山の配列
   */
  constructor(private stack: number[]) {}

  init() {
    this.stack.splice(0);

    // TODO: 赤牌の枚数をどこかから引っ張ってくる
    for (let num = 1; num <= 9; num++) {
      this.stack.push(
        ...[
          TileType.serializeToBitField(num, Enums.ETileKind.MANZU, false),
          TileType.serializeToBitField(num, Enums.ETileKind.PINZU, false),
          TileType.serializeToBitField(num, Enums.ETileKind.SOZU, false),
        ]
      );
    }

    for (let ji = 1; ji <= 7; ji++) {
      this.stack.push(
        TileType.serializeToBitField(ji, Enums.ETileKind.JIHAI, false)
      );
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
  pick(): Tile | null {
    if (this.count <= 0) {
      return null;
    }

    let bf = this.stack[0];
    this.stack.splice(0, 1);
    return Tile.deserialize(bf);
  }

  /**
   * 王牌を考慮した残り枚数
   */
  get count(): number {
    return this.stack.length - 14;
  }
}
