import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movePlayer, timeUpdated, updateScreenSize } from '../../actions/gameActions';
import GameStage from './GameStage';
import BattleMode from './BattleMode';
import TimeCounter from './TimeCounter';
import { MODE_MAP, MODE_BATTLE } from '../../models/gameModels'

class GameScreen extends Component {

    constructor(props) {
        super(props);
        this.onTileClick = this.onTileClick.bind(this);
        this.updateScreenSize = this.updateScreenSize.bind(this);
        this.onTimeUpdated = this.onTimeUpdated.bind(this);
    }

    onTileClick(x, y) {
        this.props.dispatch(movePlayer(x, y));
    }

    updateScreenSize(width, height) {
        this.props.dispatch(updateScreenSize(width, height));
    }

    onTimeUpdated(interval) {
        this.props.dispatch(timeUpdated(interval));
    }

    render() {
        const { dispatch, game } = this.props
        switch (game.mode) {
            case MODE_MAP:
                return (
                    <div className="screen">
                        <TimeCounter onTimeUpdated={this.onTimeUpdated} interval={game.timeUpdateInterval} />
                        <GameStage game={game}
                            onTileClick={this.onTileClick}
                            updateScreenSize={this.updateScreenSize} />
                    </div>
                );
            case MODE_BATTLE:
                return (
                    <div className="screen">
                        <TimeCounter onTimeUpdated={this.onTimeUpdated} interval={game.timeUpdateInterval} />
                        <BattleMode game={game}
                            onTileClick={this.onTileClick}
                            updateScreenSize={this.updateScreenSize} />
                    </div>
                )
        }
    }
}

function select(state) {
    return {
        game: state.game
    }
}

export default connect(select)(GameScreen);