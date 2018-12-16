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
            return <div className="tile noselect" onClick={() => this.props.onTileClick(x, y)}
                style={{ background }} key={x * mapHeight + y}>
                {`${x}, ${y}`}
            </div>
        }

        let getObject = (item, x, y) => {
            if (item != undefined) {
                let background = "red";
                let tileDimen = this.props.game.stage.tileDimen;
                let left = x * tileDimen;
                let top = y * tileDimen;
                return <div className="game-obj noselect" onClick={() => this.props.onTileClick(x, y)}
                    style={{ background, left, top }} key={"obj" + x * mapHeight + y}>
                    {`${x}, ${y} ${item.name}`}
                </div>
            }
        }

        let mapTop = game.stage.mapY;
        let mapLeft = game.stage.mapX;

        return (
            <div className="screen game-stage" ref={this.screen}>
                <TimeCounter onTimeUpdated={this.props.onTimeUpdated} interval={game.timeUpdateInterval} />
                <div className="map" style={{
                    left: mapLeft,
                    top: mapTop
                }} key="map">
                    <div className="tile-container" style={{
                        height: mapHeight,
                        maxHeight: mapHeight
                    }}>
                        {
                            game.stage.tiles.map((col, x) => (col.map((row, y) => getTile(row, x, y))))
                        }
                    </div>
                    {
                        game.stage.objs.map((col, x) => (col.map((row, y) => getObject(row, x, y))))
                    }
                </div>
                <div key="player" className="player noselect" style={{
                    left: game.player.mapPosition.x,
                    top: game.player.mapPosition.y
                }}>{game.player.name}</div>
            </div>
        )
    }

    handleClick(e) {
        const node = this.refs.input;
        const text = node.value.trim()
        this.props.onUpdateClick(text)
    }
}