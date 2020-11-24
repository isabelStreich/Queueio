import React, { Component } from 'react'

import ResultatRechercheContainer from './resultat-recherche-container'
import DetailsRechercheContainer from './details-recherche-container'

class RechercheContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {
            pageRecherche: 'resultat',
            masterId: ''
        }

        // Cette liaison est nécéssaire afin de permettre
        // l'utilisation de `this` dans la fonction de rappel.
        this.handleEachAlbumClick = this.handleEachAlbumClick.bind(this)
    }

    handleEachAlbumClick (event) {
        const masterIdClicked = document.getElementById('select_each_album').getAttribute('data-key')
        this.setState({ pageRecherche: 'resultatDetails', masterId: masterIdClicked })
    }

    render () {
        let nextRechercheContainer = ''
        switch (this.state.pageRecherche) {
        case 'resultat':
            nextRechercheContainer = <ResultatRechercheContainer onHandleEachAlbumClick={this.handleEachAlbumClick} rechercheValeur={this.props.rechercheValeur} />
            break
        case 'resultatDetails':
            nextRechercheContainer = <DetailsRechercheContainer masterId={this.state.masterId} />
        }
        return (
            nextRechercheContainer
        )
    }
}

export default RechercheContainer
