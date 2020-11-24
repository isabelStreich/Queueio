import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './src/container/app'

import 'bootstrap/dist/css/bootstrap.min.css'

const rootElement = document.getElementById('app')
ReactDOM.render(
    <App />,
    rootElement
)
