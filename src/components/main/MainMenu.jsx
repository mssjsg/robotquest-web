import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { setCharName } from '../../actions/gameActions';

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.onItemClick = this.onItemClick.bind(this);
        this.startRef = React.createRef();
        this.menuItems = [{
            title: "Start",
            to: "/game",
            ref: this.startRef
        }, {
            title: "About",
            to: "/about",
            ref: "about"
        }];
    }

    onItemClick(event) {
        let reg = /\/game$/;
        if(event.target.href.match(reg)) {
            this.props.dispatch(setCharName(this.nameInput.value))
        }
    }

    render() {
        const { dispatch, game } = this.props;

        return (
            <div className="screen main-menu">
                <h1>Robot Quest</h1>
                <label>
                    Your Name:
                    <input type="type" name="charName" ref={(input) => { this.nameInput = input; }}/>
                </label>
                <ul>
                    {this.menuItems.map(item => <li onClick={this.onItemClick} key={item.to} ref={item.ref}><Link to={`${item.to}`}>{item.title}</Link></li>)}
                </ul>
            </div>
        )
    }
}

function select(state) {
    return {
        game: state.game
    }
}

export default withRouter(connect(select)(MainMenu));