import { Tile } from "@src/tile/Tile";
import { Dora } from "./Dora";

/**
 * 王牌
 */
export class Wanpai {
  private _doras: Dora[] = [];
  private index: number = 0;
  
  /**
   * コンストラクタ
   * @param tiles 初期の牌リスト
   */
  constructor(private tiles: Tile[], private maxDora = 4) {
    // 初期ドラ設定
    this.makeDora();
  }

  /**
   * 王牌から自摸る
   * @param tile 後ろに付く牌
   * @returns 自摸った牌。自摸れないならnull
   */
  pick(addTile: Tile): Tile | null {
    if (!this.isPickable) { return null; }
    const tile = this.tiles[this.index].clone();
    this.index++;
    this.makeDora();    // 新ドラ
    this.tiles.push(addTile);
    return tile;
  }

  /**
   * ドラ表示牌を全て取得
   * @param needBack trueなら裏ドラも含める
   * @returns ドラ表示牌の配列
   */
  getDoras(needBack: boolean): Tile[] {
    const list: Tile[] = [];
    this._doras.forEach(d => {
      list.push(d.face);
      if (needBack) {
        list.push(d.back);
      }
    });
    return list;
  }

  /**
   * ドラの枚数を取得
   * ※常に裏ドラは含まない
   */
  get doraCount(): number { return this._doras.length; }

  /**
   * 引ける牌があるか？
   */
  get isPickable(): boolean { return this.index < this.maxDora; }

  /**
   * ドラ生成
   */
  private makeDora(): void {
    const count = this._doras.length * 2;
    this._doras.push(new Dora(this.tiles[count + 4], this.tiles[count + 5]));
  }
}