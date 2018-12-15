// this reducer is for reducing the rendering of the game
import { Tile, Stage, Game, Position, Player } from "../models/gameModels"
import { LOAD_STAGE, SET_CHAR_NAME } from "../actions/gameActions"

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

function loadPlayer() {
    return new Player()
}

export function game(state = initialState, action) {
    let newState;
    switch (action) {
        case LOAD_STAGE:
            newState = new Game({ stage: null, player: state.player});
            newState.stage = loadStage(action.index);
            break;
        case SET_CHAR_NAME:
            newState = new Game({ stage: state.stage, player: null});
            newState.player = new Player(state.player);
            newState.player.name = action.name;
            break;
        default:
            return state;
    }

    return newState;
}