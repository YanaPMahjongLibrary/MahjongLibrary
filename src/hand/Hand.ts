import { Tile } from "@src/tile/Tile";
import { Furo } from "./Furo";

/**
 * プレイヤーの手を表すクラス
 */
export class Hand {
  private _tiles: Tile[] = [];
  private _furos: Furo[] = [];

  /**
   * 手牌
   */
  get tiles(): Tile[] { return this._tiles.concat(); }

  /**
   * 副露
   */
  get furos(): Furo[] { return this._furos.concat(); }

  /**
   * 牌を追加
   * @param tile 追加する牌
   */
  add(tile: Tile): void {
    this._tiles.push(tile);
  }

  /**
   * 牌を取り除く
   * @param index 取り除く牌のインデックス
   */
  remove(index: number): void {
    this._tiles.splice(index, 1);
  }

  /**
   * 手牌コンテキスト生成
   * @returns 手牌コンテキスト
   */
  makeContext(): HandContext {
    return new HandContext(this._tiles, this._furos);
  }
}

/**
 * 手牌コンテキスト
 */
export class HandContext {
  /**
   * コンストラクタ
   * @param _tiles 手牌配列
   * @param _furos 副露配列
   */
  constructor(private _tiles: Tile[], private _furos: Furo[]) {
  }
  
  /**
   * 手牌
   */
  get tiles(): Tile[] { return this._tiles.concat(); }

  /**
   * 副露
   */
  get furos(): Furo[] { return this._furos.concat(); }

  /**
   * 指定した牌で構成可能な副露のリストを返す
   * 
   * @note どこからでもチーできるので、上家以外のチーは利用者側で弾く事
   * @param tile 牌
   * @param ownPlayerIndex 自身のプレイヤーインデックス
   * @param otherPlayerIndex 牌を切ったプレイヤーのインデックス
   */
  canFuroList(tile: Tile, ownPlayerIndex: number, otherPlayerIndex: number): Furo[] {
    let list: Furo[] = [];

    if (ownPlayerIndex !== otherPlayerIndex) {
      // 刻子・順子に関しては取り得る３枚の組み合わせを全列挙し、面子として成立するものだけを抽出する
      for (let i = 0; i < this._tiles.length - 1; i++) {
        for (let j = 1; j < this._tiles.length; j++) {
          list.push(new Furo([tile, this._tiles[i], this._tiles[j]], otherPlayerIndex, false, false));
        }
      }
      list = list.filter(f => f.checkValid());
    } else {
      // 加槓
      // 同じ牌の明刻を列挙するだけ
      const minko = this._furos.filter(f => f.tiles.filter(t => t.equal(tile)).length === 3);
      if (minko.length === 1) {
        list.push(new Furo([tile, ...minko[0].tiles], ownPlayerIndex, true));
      }
    }
    
    // 暗槓・大明槓
    // 同じ牌が手牌に３枚あれば成立
    const sameHais = this._tiles.filter(t => t.equal(tile));
    if (sameHais.length >= 3) {
      list.push(new Furo(sameHais, otherPlayerIndex));
    }
    
    return list;
  }
}
