import React, { Component } from 'react'
import { connect } from 'react-redux'
import { movePlayer, timeUpdated, updateScreenSize } from '../../actions/gameActions'
import GameStage from './GameStage'

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

        return (
            <div className="screen">
                <GameStage game={game}
                    onTimeUpdated={this.onTimeUpdated}
                    onTileClick={this.onTileClick}
                    updateScreenSize={this.updateScreenSize}/>
            </div>
        )
    }
}

function select(state) {
    return {
        game: state.game
    }
}

export default connect(select)(GameScreen);