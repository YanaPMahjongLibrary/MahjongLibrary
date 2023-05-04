import { Points } from './Points';
import { Discard } from "./Discard";
import { Wall } from './Wall';
import { Wanpai } from './Wanpai';
import { Counts } from './Counts';
import { Round } from './Round';
import { Tile } from '@src/tile/Tile';
import { EWind } from '@src/enums';

/**
 * 一人のプレイヤーの場況
 */
interface PlayerBoard {
  discard: Discard;
  points: Points;
}

/**
 * 場況
 */
export class Board {
  private wall: Wall;
  private wanpai: Wanpai;
  private playersBoard: PlayerBoard[];
  private counts: Counts;
  private round: Round;

  constructor(wallTiles: Tile[], pickableWanpaiCount: number) {
    this.wall = new Wall(wallTiles);
    const wanpaiTiles: Tile[] = [];
    // 自摸れる王牌の数＋表ドラ＋裏ドラの数だけ繰り返す
    for (let i = 0; i < pickableWanpaiCount * 3; i++) {
      wanpaiTiles.push(this.wall.pickForWanpai()!);
    }
    this.wanpai = new Wanpai(wanpaiTiles);
    this.playersBoard = [];

    // TODO: どこから持ってくるんだこんなの
    const playerCount = 4;
    const initPoints = 25000;
    for (let i = 0; i < playerCount; i++) {
      this.playersBoard.push({
        discard: new Discard(),
        points: new Points(initPoints),
      })
    }
    this.counts = new Counts(0);
    this.round = new Round(EWind.EAST, 1);
  }

  /**
   * 場況コンテキスト生成
   * @returns 場況コンテキスト
   */
  makeContext(): BoardContext {
    return new BoardContext(this.wall.count, this.wanpai.getDoras(false), this.playersBoard.concat(), this.counts, this.round);
  }
  
  /**
   * 自摸る牌があるか？
   */
  get hasNextPick(): boolean { return this.wall.count > 0; }

  /**
   * 牌を自摸る
   * @returns 自摸った牌。自摸れない場合はnull
   */
  pick(): Tile | null {
    return this.wall.pick();
  }

  /**
   * 王牌から自摸る
   * @returns 自摸った牌。自摸れない場合はnull
   */
  pickWanpai(): Tile | null {
    const t = this.wall.pickForWanpai();
    if (!t) { return null; }
    return this.wanpai.pick(t);
  }

  /**
   * 牌を捨てる
   * @param playerIndex 捨てるプレイヤーのインデックス
   * @param tile 捨てた牌
   */
  discard(playerIndex: number, tile: Tile): void {
    this.playersBoard[playerIndex].discard.add(tile);
  }
}

/**
 * 場況コンテキスト
 * Boardクラスのreadonlyなデータ
 */
export class BoardContext {
  /**
   * コンストラクタ
   */
  constructor(private _wallCount: number,
    private _doras: Tile[],
    private _playersBoard: PlayerBoard[],
    private _counts: Counts,
    private _round: Round) {}

  /**
   * ドラ
   */
  get doras(): Tile[] { return this._doras.concat(); }

  /**
   * プレイヤーの場況配列
   */
  get playersBoard(): PlayerBoard[] { return this._playersBoard.concat(); }

  /**
   * 積み棒
   */
  get counts(): Counts { return this._counts; }

  /**
   * 場風と局数
   */
  get round(): Round { return this._round; }
}
