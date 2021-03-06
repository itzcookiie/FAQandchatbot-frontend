import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducer'
import App from './App'

const loggerMiddleware = createLogger()

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware, loggerMiddleware
        )
    )

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)