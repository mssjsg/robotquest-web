import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GameScreen from './GameScreen'
import GameOver from './GameOver';
import MainMenu from './MainMenu';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
        <div>
            <Route path="/" exact component={MainMenu} />
            <Route path="/game" component={GameScreen} />
            <Route path="/gameover" component={GameOver} />
        </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root