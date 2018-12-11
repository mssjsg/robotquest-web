import React, { Component, PropTypes } from 'react'

export default class Game extends Component {
    render() {
        return (
            <div>
                <input type='text' ref='input'/>
                <p>score: {this.props.score}</p>
                <button onClick={(e) => this.handleClick(e)}>update</button>
            </div>
        )
    }

    handleClick(e) {
        const node = this.refs.input;
        const text = node.value.trim()
        this.props.onUpdateClick(text)
    }
}