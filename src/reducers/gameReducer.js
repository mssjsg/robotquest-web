// this reducer is for reducing the rendering of the game
import { Tile, Stage, Game, Position, Player, GameObject } from "../models/gameModels"
import {
    LOAD_STAGE,
    SET_CHAR_NAME,
    MOVE_PLAYER,
    TIME_UPDATED,
    UPDATE_SCREEN_SIZE
} from "../actions/gameActions"

const initialState = new Game({
    stage: loadStage(0),
    player: new Player({})
});

function loadStage(index) {
    let width = 10;
    let height = 10;
    let tiles = [];
    let objs = [];
    for (let x = 0; x < width; x++) {
        let row = [];
        tiles.push(row);

        let objRow = [];
        objs.push(objRow);
        for (let y = 0; y < width; y++) {
            let tile = new Tile({ color: Math.floor(Math.random() * 10) });
            row.push({ tile });

            let objectType = Math.floor(Math.random() * 6);
            if (objectType == 1) {
                objRow.push(new GameObject({ type: 1 }));
            } else {
                objRow.push(undefined);
            }
        }
    }

    return new Stage({ index, width, height, tiles, objs });
}

function getNextMapPos({
    stageMapPos,
    targetPlayerPos,
    speed,
    tileDimen,
    screenDimen,
    limitMin,
    limitMax,
    screenPlayerPos
}) {
    let targetMapPos = screenDimen / 2 - tileDimen / 2 - targetPlayerPos * tileDimen;
    let mapPos = targetMapPos;
    let finished = false;
    let blocked = -1;

    if (stageMapPos != -1) {
        if (targetMapPos > stageMapPos) {
            mapPos = Math.min(stageMapPos + speed, targetMapPos);
            let limit = screenPlayerPos - limitMin;
            console.log(`limit min:${limit}`);
            if (mapPos > limit) {
                mapPos = limit;
                blocked = 0;
            }
        } else if (targetMapPos < stageMapPos) {
            mapPos = Math.max(stageMapPos - speed, targetMapPos);
            let limit = screenPlayerPos + tileDimen - limitMax;
            console.log(`limit max:${limit}`);
            if (mapPos < limit) {
                mapPos = limit;
                blocked = 1;
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
    let newGameAttrs = Object.assign({}, state);
    switch (action.type) {
        case LOAD_STAGE:
            newGameAttrs.stage = loadStage(action.index);
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
                y: action.height / 2 - newGameAttrs.stage.tileDimen / 2
            })
            break;
        case TIME_UPDATED:
            let stage = state.stage;
            let player = state.player;
            let screenPosition = player.screenPosition;
            let objs = stage.objs;
            console.log(`${stage.tileDimen} ${stage.screenHeight} ${stage.targetPosition.y}`);
            
            // find occupied indexes
            let currentX = (screenPosition.x - stage.mapX) * 1.0 / stage.tileDimen;
            let currentY = (screenPosition.y - stage.mapY) * 1.0 / stage.tileDimen;
            let objectLimitIndexes = { minX: Math.floor(currentX) - 1, maxX: Math.ceil(currentX) + 1,
                minY: Math.floor(currentY) - 1, maxY: Math.ceil(currentY) + 1 };
            // console.log(`currentX: ${currentX} currentY: ${currentY} ${JSON.stringify(objectLimitIndexes)}`)
            newGameAttrs.stage = new Stage(stage);

            let changed = false;
            let blocked = -1;
            if (stage.targetPosition.x != player.position.x) {
                let yLimitIndex = Math.floor(currentY);
                let minObj, maxObj;
                if (objectLimitIndexes.minX >= 0) {
                    minObj = objs[objectLimitIndexes.minX][yLimitIndex];
                }

                if (objectLimitIndexes.maxX < stage.width) {
                    maxObj = objs[objectLimitIndexes.maxX][yLimitIndex];
                }

                let limitMin = minObj != undefined ? (objectLimitIndexes.minX + 1) * stage.tileDimen : 0;
                let limitMax = maxObj != undefined ? (objectLimitIndexes.maxX) * stage.tileDimen : stage.width * stage.tileDimen;
                console.log(`min:${limitMin} max:${limitMax}`);
                let result = getNextMapPos({
                    stageMapPos: stage.mapX,
                    targetPlayerPos: stage.targetPosition.x,
                    speed: player.speed,
                    tileDimen: stage.tileDimen,
                    screenDimen: stage.screenWidth,
                    limitMin,
                    limitMax,
                    screenPlayerPos: screenPosition.x
                });
                newGameAttrs.stage.mapX = result.mapPos;
                if (result.finished) {
                    newGameAttrs.player = new Player(state.player);
                    newGameAttrs.player.position.x = stage.targetPosition.x;
                }
                changed = true;
                blocked = result.blocked;
            }
            
            if ((blocked >= 0 || !changed || stage.mapY == -1) && stage.targetPosition.y != player.position.y) {
                let xLimitIndex = Math.floor(currentX);
                let minObj, maxObj;
                if (objectLimitIndexes.minY >= 0) {
                    minObj = objs[xLimitIndex][objectLimitIndexes.minY];
                }

                if (objectLimitIndexes.maxY < stage.height) {
                    maxObj = objs[xLimitIndex][objectLimitIndexes.maxY];
                }

                let result = getNextMapPos({
                    stageMapPos: stage.mapY,
                    targetPlayerPos: stage.targetPosition.y,
                    speed: player.speed,
                    tileDimen: stage.tileDimen,
                    screenDimen: stage.screenHeight,
                    limitMin: minObj != undefined ? (objectLimitIndexes.minY + 1) * stage.tileDimen : 0,
                    limitMax: maxObj != undefined ? (objectLimitIndexes.maxY) * stage.tileDimen : stage.height * stage.tileDimen,
                    screenPlayerPos: screenPosition.y
                });
                newGameAttrs.stage.mapY = result.mapPos;
                if (result.finished) {
                    newGameAttrs.player = new Player(state.player);
                    newGameAttrs.player.position.y = stage.targetPosition.y;
                }
            }
            break;
        default:
            return state;
    }

    return new Game(newGameAttrs);
}