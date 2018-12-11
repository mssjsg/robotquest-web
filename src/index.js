import React from 'react'

import { render } from 'react-dom'
import { createStore } from 'redux'
import Root from './components/Root'
import robotQuestApp from './reducers/reducers'

const store = createStore(robotQuestApp)

render(<Root store={store} />, document.getElementById('root'))