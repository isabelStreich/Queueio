import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './container/app'
import './component/animation-nav-bar'
import './container/accueil/page-login-container'

import 'bootstrap/dist/css/bootstrap.min.css'

const rootElement = document.getElementById('app')
ReactDOM.render(
    < LoginComponent />,
    rootElement
)
