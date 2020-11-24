import React, { Component } from 'react' // importer librairie react
import { Button } from '@material-ui/core'

import NavBarContainer from './accueil/nav-bar-container' // importer le composant navbar

import AccueilContainer from './accueil/accueil-container'

import RechercheContainer from './recherche/recherche-container'

import PlayListContainer from './playlist/play-list-container'

import 'bootstrap/dist/css/bootstrap.min.css'

import ResultatRechercheContainer from '../container/Recherche/resultat-recherche-container'

class App extends Component { // composant container qui est le formualaire 'Contenant'
    constructor(props) {
        super(props)

        this.state = {
            container: 'accueil'

        }


        this.handleAccueilOnClick = this.handleAccueilOnClick.bind(this)

    }



    handleAccueilOnClick() {
        this.setState({ isPlayListOpen: false })
    }






    componentDidMount() {
        document.getElementById('btnPlaylist').addEventListener('click', (event) => {
            this.state.playlistId = document.getElementById('inputGroupSelect04').value
            const playListId = document.getElementById('inputGroupSelect04').value
            if (playListId !== '-1') {
                this.setState({ container: 'playlist', rechercheValeur: '', playlistId: document.getElementById('inputGroupSelect04').value })
            } else {
                alert('Veuillez choisir une playlist pour afficher son contenu')
            }
        })
    }

    render() {
        const BUTTONS = [{
            handleOnClick: this.handlePlayListOnClick
        }]
        let nextContainer = ''

        switch (this.state.container) {
            case 'accueil':
                nextContainer = <AccueilContainer />
                break
            case 'recherche':
                nextContainer = <RechercheContainer rechercheValeur={this.state.rechercheValeur} />
                break
            case 'playlist':
                nextContainer = <PlayListContainer playlistId={this.state.playlistId} />
                break
            default:
                nextContainer = <AccueilContainer />
        }

        return (
            <div>
                <div>

                    <NavBarContainer onHandleRechercheOnClick={this.handleRechercheOnClick} buttons={BUTTONS} />

                </div>
                <div>
                    {nextContainer}
                </div>

            </div>
        )
    }
}

export default App
