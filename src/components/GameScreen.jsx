import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateScore } from '../actions/actions'
import Game from './Game'

class GameScreen extends Component {
    render() {
        const { dispatch, game } = this.props

        return (
            <div>
                <Game score={game.score} onUpdateClick={text => dispatch(updateScore(text))}/>
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