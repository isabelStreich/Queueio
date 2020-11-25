
import React, { Component } from 'react'

import LoginComponent from '../../component/page-login-component'
import NavBarComponent from '../../component/nav-bar-component'

class LoginContainer extends Component {
    constructor() {
        super()

        this.state = {

        }

        /* console.log(this.onClick) */
        this.hadelOnclick = this.hadelOnclick.bind(this)
    }

    hadelOnclick() {

    }

    render() {
        const BUTTONS = [{
            label: 'Acceuil',
            onClick: this.hadelOnclick
        }, {
            label: 'Commerces',
            onClick: this.hadelOnclick
        }
        ]
        return (

            <div>
                <LoginComponent />
            </div>

        )
    }
}

export default LoginContainer
