import React from 'react'

import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './components/App.jsx'
import robotQuestApp from './reducers/reducers'

let store = createStore(robotQuestApp)
let rootElement = document.getElementById('root')

render(
    <Provider store = {store}>
        <App />
    </Provider>,

    rootElement
)