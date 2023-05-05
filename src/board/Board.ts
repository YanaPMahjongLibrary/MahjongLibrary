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
  private pickableWanpaiCount: number;

  /**
   * コンストラクタ
   */
  constructor() {
    this.wall = new Wall([]);
    this.wanpai = new Wanpai([], 4);
    this.playersBoard = [];
    this.counts = new Counts(0);
    this.round = new Round(EWind.EAST, 1);
    this.pickableWanpaiCount = 4;
  }

  /**
   * 初期化
   * @param pickableWanpaiCount 嶺上牌の枚数
   * @param playerCount プレイヤー人数
   * @param initialPoints 配給原点
   */
  initialize(pickableWanpaiCount: number, playerCount: number, initialPoints: number) {
    this.pickableWanpaiCount = pickableWanpaiCount;
    this.playersBoard = [];
    for (let i = 0; i < playerCount; i++) {
      this.playersBoard.push({
        discard: new Discard(),
        points: new Points(initialPoints),
      })
    }
    this.counts = new Counts(0);
    this.round = new Round(EWind.EAST, 1);
  }

  /**
   * 次の局へ
   * @param renchan 連荘か？
   */
  toNextRound(renchan: boolean): void {
    if (!renchan) {
      // 次局へ
      if (this.round.roundNum < this.playersBoard.length) {
        this.round = new Round(this.round.wind, this.round.roundNum + 1);
      } else {
        // 次の場風へ
        const nextWind = ((current: EWind) => {
          switch (current) {
            case EWind.EAST: return EWind.SOUTH;    // 南入
            case EWind.SOUTH: return EWind.WEST;    // 西入
            case EWind.WEST: return EWind.NORTH;    // 北入
          }
          return EWind.EAST;    // とりあえず東場に戻す
        })(this.round.wind);
        this.round = new Round(nextWind, 0);
      }
    } else {
      // 連荘
      this.addCount();
    }
  }

  /**
   * 積み棒を増やす
   * @param add 増やす本数
   */
  addCount(add: number = 1): void {
    this.counts = new Counts(this.counts.value + add);
  }

  /**
   * 牌山のリセット
   * @param wallTiles 牌山の牌（洗牌済み）
   */
  resetWall(wallTiles: Tile[]): void {
    this.wall = new Wall(wallTiles);
    const wanpaiTiles: Tile[] = [];
    // 自摸れる王牌の数＋表ドラ＋裏ドラの数だけ繰り返す
    for (let i = 0; i < this.pickableWanpaiCount * 3; i++) {
      wanpaiTiles.push(this.wall.pickForWanpai()!);
    }
    this.wanpai = new Wanpai(wanpaiTiles);
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
   * 複数枚自摸る
   * @param count 自摸る枚数
   * @returns 自摸った牌の配列
   */
  pickMultiple(count: number): Tile[] {
    return this.wall.pickMultiple(count);
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
