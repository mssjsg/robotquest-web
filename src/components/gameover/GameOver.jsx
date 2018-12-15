import React, { Component } from 'react'
import { connect } from 'react-redux'

class GameOver extends Component {
    render() {
        const { dispatch, game } = this.props

        return (
            <div>
                <p>Game Over</p>
            </div>
        )
    }
}

function select(state) {
    return {
        game: state.game
    }
}

export default connect(select)(GameOver);