import React, { Component, PropTypes } from 'react'

export default class GameStage extends Component {
    render() {
        let game = this.props.game;

        let mapHeight = 80 * game.stage.height;
        
        let getTile = (item, x, y) => {
            let color = parseInt(255 * item.tile.color / 10);
            let background = `rgb(${color}, ${color}, ${color})`;
            return <div className="tile" style={{background}} key={x * mapHeight + y}>
                { `${x}, ${y}` }
            </div>
        }

        return (
            <div className="screen game-stage">
                <div className="inner">
                    <div className="map" style={{height: mapHeight, maxHeight: mapHeight}}>
                    {
                        game.stage.tiles.map((col, x) => (col.map((row, y) => getTile(row, x, y))))
                    }
                    </div>
                </div>
            </div>
        )
    }

    handleClick(e) {
        const node = this.refs.input;
        const text = node.value.trim()
        this.props.onUpdateClick(text)
    }
}