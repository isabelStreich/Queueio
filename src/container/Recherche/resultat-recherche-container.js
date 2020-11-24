import React, { Component } from 'react'

import ResultatRechercheComponent from '../../component/recherche/resultat-recherche-component'
import Discogs from '../../service/discogs'

class ResultatRechercheContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            result: []
        }
    }

    componentDidMount () {
        const DiscogsMusic = new Discogs('pQzAZbFqlwSWOJDgKaUysMarTUaZmCEcuJmbqCZA')
        if (this.props.rechercheValeur !== '') {
            DiscogsMusic.search(this.props.rechercheValeur, (data) => {
                if (data.results.length > 0) {
                    this.setState({ result: data.results })
                } else {
                    alert('Aucun resultat ne correspond a votre recherche')
                }
            })
        } else {
            alert('Champ de recherche vide')
        }
    }

    render () {
        return (
            <div id='divCarPrincipal'>

                {this.state.result.map((item, index) => <ResultatRechercheComponent onClick={this.props.onHandleEachAlbumClick} key={index} textP={item.title} url={item.thumb} masterId={item.master_id} />)}

            </div>

        )
    }
}
export default ResultatRechercheContainer
