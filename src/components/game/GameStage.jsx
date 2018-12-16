import React, { Component } from 'react';
import TimeCounter from './TimeCounter';

export default class GameStage extends Component {

    constructor(props) {
        super(props);
        this.screen = React.createRef();
        this.tileDimen = 80;
    }

    componentDidMount() {
        let screenWidth = this.screen.current.offsetWidth;
        let screenHeight = this.screen.current.offsetHeight;
        this.props.updateScreenSize(screenWidth, screenHeight);
    }

    render() {
        let game = this.props.game;

        let mapHeight = 80 * game.stage.height;

        let getTile = (item, x, y) => {
            let color = parseInt(255 * item.tile.color / 10);
            let background = `rgb(${color}, ${color}, ${color})`;
            return <div className="tile" onClick={() => this.props.onTileClick(x, y)}
                style={{ background }} key={x * mapHeight + y}>
                    {`${x}, ${y}`}
            </div>
        }

        let mapTop = game.stage.mapY;
        let mapLeft = game.stage.mapX;

        return (
            <div className="screen game-stage" ref={this.screen}>
                <TimeCounter onTimeUpdated={this.props.onTimeUpdated} interval={game.timeUpdateInterval}/>
                <div className="map" style={{
                    height: mapHeight,
                    maxHeight: mapHeight,
                    left: mapLeft,
                    top: mapTop
                }}>
                    {
                        game.stage.tiles.map((col, x) => (col.map((row, y) => getTile(row, x, y))))
                    }
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