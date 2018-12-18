import React, { Component } from 'react'

class BattleMode extends Component {
    render() {
        const battle = this.props.game.battle;
        const player = this.props.game.player;
        return (
            <div className="screen battle-mode">
                <div className="enemies">
                    {battle.enemies.map(enemy => (
                        <div className="battle-enemy"/>
                    ))}
                </div>
                <div className="player-team">
                    <div className="player-team-member"/>
                </div>
                <div className="battle-menu">
                    <ul>
                        {player.skills.map(skill => (
                            <li className="skill-item">{skill.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default BattleMode;