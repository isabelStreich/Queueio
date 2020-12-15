
import React, { Component } from 'react' // importer librairie react

import LoginRapideComponent from '../../component/page-login-Rapide-component' // importer le composant accueil
import NavBarComponent from '../../component/nav-bar-component'

class LoginRapideContainer extends Component {
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
                <LoginRapideComponent />
            </div>

        )
    }
}

export default LoginRapideContainer
