// this reducer is for reducing the rendering of the game
import {
  Tile, Stage, Game, Position, Player, MapObject, MODE_BATTLE, MODE_MAP, Enemy, Battle, Skill,
} from '../models/gameModels';
import {
  LOAD_STAGE,
  SET_CHAR_NAME,
  MOVE_PLAYER,
  TIME_UPDATED,
  UPDATE_SCREEN_SIZE,
} from '../actions/gameActions';

const initialState = new Game({
  stage: loadStage(0),
  player: new Player({}),
});

function loadStage(index) {
  const width = 10;
  const height = 10;
  const tiles = [];
  const objs = [];
  for (let x = 0; x < width; x++) {
    const row = [];
    tiles.push(row);

    const objRow = [];
    objs.push(objRow);
    for (let y = 0; y < width; y++) {
      const tile = new Tile({ color: Math.floor(Math.random() * 10) });
      row.push({ tile });

      const objectType = Math.floor(Math.random() * 6);
      if (objectType == 1) {
        objRow.push(new MapObject({ type: 1 }));
      } else {
        objRow.push(null);
      }
    }
  }

  return new Stage({
    index, width, height, tiles, objs,
  });
}

function loadBattle(mapObj) {
  const enemies = [new Enemy({})];
  return new Battle({ enemies });
}

function getNextMapPos({
  stageMapPos,
  targetPlayerPos,
  speed,
  tileDimen,
  screenDimen,
  limitMin,
  limitMax,
  screenPlayerPos,
}) {
  const targetMapPos = screenDimen / 2 - tileDimen / 2 - targetPlayerPos * tileDimen;
  let mapPos = targetMapPos;
  let finished = false;
  let blocked = null;

  if (stageMapPos != -1) {
    if (targetMapPos > stageMapPos) {
      mapPos = Math.min(stageMapPos + speed, targetMapPos);
      const limit = screenPlayerPos - limitMin;
      console.log(`limit min:${limit}`);
      if (mapPos > limit) {
        mapPos = limit;
        blocked = { direction: 0 };
      }
    } else if (targetMapPos < stageMapPos) {
      mapPos = Math.max(stageMapPos - speed, targetMapPos);
      const limit = screenPlayerPos + tileDimen - limitMax;
      console.log(`limit max:${limit}`);
      if (mapPos < limit) {
        mapPos = limit;
        blocked = { direction: 1 };
      }
    } else {
      finished = true;
    }
  } else {
    finished = true;
  }
  return { mapPos, finished, blocked };
}

export function game(state = initialState, action) {
  const newGameAttrs = Object.assign({}, state);
  switch (action.type) {
    case LOAD_STAGE:
      newGameAttrs.stage = loadStage(action.index);
      newGameAttrs.player = new Player(state.player);
      newGameAttrs.player.skills = [];
      newGameAttrs.player.skills.push(new Skill({
        name: 'Punch',
        damage: 100,
      }));
      break;
    case SET_CHAR_NAME:
      newGameAttrs.player = new Player(state.player);
      newGameAttrs.player.name = action.name;
      break;
    case MOVE_PLAYER:
      newGameAttrs.stage = new Stage(state.stage);
      newGameAttrs.stage.targetPosition = new Position(action);
      break;
    case UPDATE_SCREEN_SIZE:
      newGameAttrs.stage = new Stage(state.stage);
      newGameAttrs.stage.screenWidth = action.width;
      newGameAttrs.stage.screenHeight = action.height;
      newGameAttrs.player = new Player(state.player);
      newGameAttrs.player.screenPosition = new Position({
        x: action.width / 2 - newGameAttrs.stage.tileDimen / 2,
        y: action.height / 2 - newGameAttrs.stage.tileDimen / 2,
      });
      break;
    case TIME_UPDATED:
      const stage = state.stage;
      const player = state.player;
      const screenPosition = player.screenPosition;
      const objs = stage.objs;
      console.log(`${stage.tileDimen} ${stage.screenHeight} ${stage.targetPosition.y}`);

      // find occupied indexes
      const currentX = (screenPosition.x - stage.mapX) * 1.0 / stage.tileDimen;
      const currentY = (screenPosition.y - stage.mapY) * 1.0 / stage.tileDimen;
      const objectLimitIndexes = {
        minX: Math.floor(currentX) - 1,
        maxX: Math.ceil(currentX) + 1,
        minY: Math.floor(currentY) - 1,
        maxY: Math.ceil(currentY) + 1,
      };
      // console.log(`currentX: ${currentX} currentY: ${currentY} ${JSON.stringify(objectLimitIndexes)}`)
      newGameAttrs.stage = new Stage(stage);

      let changed = false;
      let blocked = null;
      if (stage.targetPosition.x != player.position.x) {
        const yLimitIndex = Math.floor(currentY);
        let minObj; let
          maxObj;
        if (objectLimitIndexes.minX >= 0) {
          minObj = objs[objectLimitIndexes.minX][yLimitIndex];
        }

        if (objectLimitIndexes.maxX < stage.width) {
          maxObj = objs[objectLimitIndexes.maxX][yLimitIndex];
        }

        const limitMin = minObj != undefined ? (objectLimitIndexes.minX + 1) * stage.tileDimen : 0;
        const limitMax = maxObj != undefined ? (objectLimitIndexes.maxX) * stage.tileDimen : stage.width * stage.tileDimen;
        console.log(`min:${limitMin} max:${limitMax}`);
        const result = getNextMapPos({
          stageMapPos: stage.mapX,
          targetPlayerPos: stage.targetPosition.x,
          speed: player.speed,
          tileDimen: stage.tileDimen,
          screenDimen: stage.screenWidth,
          limitMin,
          limitMax,
          screenPlayerPos: screenPosition.x,
        });
        newGameAttrs.stage.mapX = result.mapPos;
        if (result.finished) {
          newGameAttrs.player = new Player(state.player);
          newGameAttrs.player.position.x = stage.targetPosition.x;
        }
        changed = true;
        blocked = result.blocked;
      }

      if ((blocked || !changed || stage.mapY == -1) && stage.targetPosition.y != player.position.y) {
        const xLimitIndex = Math.floor(currentX);
        let minObj; let
          maxObj;
        if (objectLimitIndexes.minY >= 0) {
          minObj = objs[xLimitIndex][objectLimitIndexes.minY];
        }

        if (objectLimitIndexes.maxY < stage.height) {
          maxObj = objs[xLimitIndex][objectLimitIndexes.maxY];
        }

        const result = getNextMapPos({
          stageMapPos: stage.mapY,
          targetPlayerPos: stage.targetPosition.y,
          speed: player.speed,
          tileDimen: stage.tileDimen,
          screenDimen: stage.screenHeight,
          limitMin: minObj != undefined ? (objectLimitIndexes.minY + 1) * stage.tileDimen : 0,
          limitMax: maxObj != undefined ? (objectLimitIndexes.maxY) * stage.tileDimen : stage.height * stage.tileDimen,
          screenPlayerPos: screenPosition.y,
        });
        newGameAttrs.stage.mapY = result.mapPos;
        if (result.finished) {
          newGameAttrs.player = new Player(state.player);
          newGameAttrs.player.position.y = stage.targetPosition.y;
        }
        blocked = result.blocked;
      }

      if (blocked) {
        newGameAttrs.mode = MODE_BATTLE;
        newGameAttrs.battle = loadBattle();
      } else {
        newGameAttrs.mode = MODE_MAP;
        delete newGameAttrs.battle;
      }

      break;
    default:
      return state;
  }

  return new Game(newGameAttrs);
}
