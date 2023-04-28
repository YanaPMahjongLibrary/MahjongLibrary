import { PlayerContext } from "./PlayerContext";
import * as _boardContext from "./BoardContext";
import * as _discard from "./Discard";
import * as _meld from "./Meld";
import * as _playerContext from "./PlayerContext";
import * as _playerHand from "./PlayerHand";
import * as _tileStack from "./TileStack";

export namespace Context {
  export type BoardContext = _boardContext.BoardContext;
  export type Discard = _discard.Discard;
  export type Meld = _meld.Meld;
  export type PlayerContext = _playerContext.PlayerContext;
  export type PlayerHand = _playerHand.PlayerHand;
  export type PlayerHandAccess = _playerHand.PlayerHandAccess;
  export type TileStack = _tileStack.TileStack;
  export type TileStackAccess = _tileStack.TileStackAccess;
}
