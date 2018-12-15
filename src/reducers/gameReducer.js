// this reducer is for reducing the rendering of the game
import { Tile, Stage, Game, Position, Player } from "../models/gameModels"
import { LOAD_STAGE, SET_CHAR_NAME, MOVE_PLAYER, TIME_UPDATED, UPDATE_SCREEN_SIZE } from "../actions/gameActions"

const MOVE_SPEED = 30;

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

export function game(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_STAGE:
            newState = new Game({ stage: null, player: state.player });
            newState.stage = loadStage(action.index);
            break;
        case SET_CHAR_NAME:
            newState = new Game({ stage: state.stage, player: null });
            newState.player = new Player(state.player);
            newState.player.name = action.name;
            break;
        case MOVE_PLAYER:
            newState = new Game({ stage: state.stage, player: null });
            newState.player = new Player(state.player);
            newState.player.targetPosition = new Position(action);
            break;
        case TIME_UPDATED:
            let game = state;
            let targetX = getMapLeft(game.tileDimen, game.screenWidth, game.player.targetPosition.x);
            let targetY = getMapTop(game.tileDimen, game.screenWidth, game.player.targetPosition.y);
            let mapX = targetX;
            let mapY = targetY;
            if (targetX > game.stage.mapX) {
                mapX = Math.min(game.stage.mapX + MOVE_SPEED, targetX);
            } else if (targetX < game.stage.mapX) {
                mapX = Math.max(game.stage.mapX - MOVE_SPEED, targetX);
            }
            newState = new Game({ stage: state.stage, player: state.player });
            newState.stage.nextMapX = mapX;
            newState.stage.nextMapY = mapY;
            break;
        default:
            return state;
    }

    return newState;
}