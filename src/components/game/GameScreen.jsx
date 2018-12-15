import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateScore } from '../../actions/gameActions'
import GameStage from './GameStage'

class GameScreen extends Component {
    render() {
        const { dispatch, game } = this.props

        return (
            <div className="screen">
                <GameStage game={game} onUpdateClick={text => dispatch(updateScore(text))}/>
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