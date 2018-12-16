// this reducer is for reducing the rendering of the game
import { Tile, Stage, Game, Position, Player } from "../models/gameModels"
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
    for (let x = 0; x < width; x++) {
        let row = [];
        tiles.push(row);
        for (let y = 0; y < width; y++) {
            let tile = new Tile({ color: Math.floor(Math.random() * 10) });
            row.push({ tile });
        }
    }

    return new Stage({ index, width, height, tiles });
}

function getNextMapPos({
    stageMapPos,
    targetPlayerPos,
    speed,
    tileDimen,
    screenDimen
}) {
    let targetMapPos = screenDimen / 2 - tileDimen / 2 - targetPlayerPos * tileDimen;
    let mapPos = targetMapPos;
    let finished = false;

    if (stageMapPos != -1) {
        if (targetMapPos > stageMapPos) {
            mapPos = Math.min(stageMapPos + speed, targetMapPos);
        } else if (targetMapPos < stageMapPos) {
            mapPos = Math.max(stageMapPos - speed, targetMapPos);
        } else {
            finished = true;
        }
    } else {
        finished = true;
    }
    return { mapPos, finished };
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
            break;
        case TIME_UPDATED:
            let stage = state.stage;
            let player = state.player;
            console.log(`${stage.tileDimen} ${stage.screenHeight} ${stage.targetPosition.y}`);
            newGameAttrs.stage = new Stage(stage);

            let changed = false;
            if (stage.targetPosition.x != player.position.x) {
                let result = getNextMapPos({
                    stageMapPos: stage.mapX,
                    targetPlayerPos: stage.targetPosition.x,
                    speed: player.speed,
                    tileDimen: stage.tileDimen,
                    screenDimen: stage.screenWidth
                });
                newGameAttrs.stage.mapX = result.mapPos;
                if (result.finished) {
                    newGameAttrs.player = new Player(state.player);
                    newGameAttrs.player.position.x = stage.targetPosition.x;
                }
                changed = true;
            }
            
            if ((!changed || stage.mapY == -1) && stage.targetPosition.y != player.position.y) {
                let result = getNextMapPos({
                    stageMapPos: stage.mapY,
                    targetPlayerPos: stage.targetPosition.y,
                    speed: player.speed,
                    tileDimen: stage.tileDimen,
                    screenDimen: stage.screenHeight
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