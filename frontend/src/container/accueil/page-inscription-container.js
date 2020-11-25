
import React, { Component } from 'react'

import PageInscriptionComponent from '../../component/page-inscription-commercant-component'
import NavBarComponent from '../../component/nav-bar-component'

class PageInscriptionContainer extends Component {
    constructor() {
        super()

        this.state = {

        }

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
                <PageInscriptionComponent />
            </div>

        )
    }
}

export default PageInscriptionContainer
