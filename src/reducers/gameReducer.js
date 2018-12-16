// this reducer is for reducing the rendering of the game
import { Tile, Stage, Game, Position, Player } from "../models/gameModels"
import {
    LOAD_STAGE,
    SET_CHAR_NAME,
    MOVE_PLAYER,
    TIME_UPDATED,
    UPDATE_SCREEN_SIZE
} from "../actions/gameActions"

const MOVE_SPEED = 70;

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

function getMapTop(tileDimen, screenHeight, targetY) {
    return screenHeight / 2 - tileDimen / 2 - targetY * tileDimen;
}

function getMapLeft(tileDimen, screenWidth, targetX) {
    return screenWidth / 2 - tileDimen / 2 - targetX * tileDimen;
}

function getNextMapPos(stageMapPos, targetMapPos) {
    let mapPos = targetMapPos;
    if (stageMapPos != -1) {
        if (targetMapPos > stageMapPos) {
            mapPos = Math.min(stageMapPos + MOVE_SPEED, targetMapPos);
        } else if (targetMapPos < stageMapPos) {
            mapPos = Math.max(stageMapPos - MOVE_SPEED, targetMapPos);
        }
    }
    return mapPos;
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
            newGameAttrs.player = new Player(state.player);
            newGameAttrs.player.targetPosition = new Position(action);
            break;
        case UPDATE_SCREEN_SIZE:
            newGameAttrs.screenWidth = action.width;
            newGameAttrs.screenHeight = action.height;
            break;
        case TIME_UPDATED:
            let game = state;
            let targetX = getMapLeft(game.tileDimen, game.screenWidth, game.player.targetPosition.x);
            let targetY = getMapTop(game.tileDimen, game.screenHeight, game.player.targetPosition.y);
            console.log(`${game.tileDimen} ${game.screenHeight} ${game.player.targetPosition.y}`);
            newGameAttrs.stage = new Stage(state.stage);
            newGameAttrs.stage.mapX = getNextMapPos(game.stage.mapX, targetX);
            newGameAttrs.stage.mapY = getNextMapPos(game.stage.mapY, targetY);
            break;
        default:
            return state;
    }

    return new Game(newGameAttrs);
}