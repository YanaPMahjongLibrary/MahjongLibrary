import { Tile } from "@src/tile/Tile";

/**
 * レスポンスタイプ
 */
export enum ETurnResponseType {
  // 牌を切る
  DISCARD,
  // 自摸和了る
  TSUMO,
  // 暗槓
  ANKAN,
}

/**
 * 切り番のレスポンス
 */
export class TurnResponse {
  private _discard: Tile | null = null;

  /**
   * 捨て牌を捨てる
   * @param tile 捨てる牌
   * @returns レスポンスオブジェクト
   */
  public static discard(tile: Tile): TurnResponse {
    const response = new TurnResponse(ETurnResponseType.DISCARD);
    response._discard = tile;
    return response;
  }

  /**
   * 捨て牌
   */
  get discard(): Tile | null { return this._discard?.clone() ?? null; }
  
  /**
   * コンストラクタ
   * @param _type レスポンスの種類
   */
  private constructor(private _type: ETurnResponseType) {
  }
}
