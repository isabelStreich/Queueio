import React, { Component } from 'react'

import DetailsRechercheComponent from '../../component/recherche/details-recherche-component'

import DetailsAlbumRechercheComponent from '../../component/recherche/details-album-recherche-component'

import Discogs from '../../service/discogs'

class DetailsRechercheContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {

            tracklistsObject: [],

            images: [],

            genres: [],

            year: '',

            title: ''

        }

        this.handleSaveTrackToPlayList = this.handleSaveTrackToPlayList.bind(this)
    }

    handleSaveTrackToPlayList (event) {
        const playlistId = document.getElementById('inputGroupSelect04').value

        const masterId = event.target.getAttribute('data-masterId')

        const dataUri = event.target.getAttribute('data-uri')

        const dataTitle = event.target.getAttribute('data-title')

        if (playlistId !== '-1') {
            fetch('/playlists/ajout', {
                method: 'POST',

                headers: {

                    'Content-Type': 'application/json'

                },

                body: JSON.stringify({

                    playlist_id: playlistId,

                    title: dataTitle,

                    uri: dataUri,

                    master_id: masterId

                })

            }).then(response => response.json())

                .then((result) => {
                    if (Object.prototype.hasOwnProperty.call(result, 'operation')) {
                        if (result.operation === '200') {
                            alert('Track ajouter a la playList')
                        } else {
                            alert('Playlist inconnu')
                        }
                    } else {
                        alert('Propriete incomplet')
                    }
                })
        } else {
            alert('Veuillez choisir une playlist pour ajouter un track')
        }
    }

    componentDidMount () {
        const DiscogsMusic = new Discogs('pQzAZbFqlwSWOJDgKaUysMarTUaZmCEcuJmbqCZA')

        DiscogsMusic.getMaster(this.props.masterId, (data) => {
            const tracklists = data.tracklist

            const videos = data.videos

            const videosLength = videos.length

            const newTracklistsObject = []

            tracklists.map((trackItem, index) => {
                if ((index + 1) <= videosLength) {
                    newTracklistsObject.push({ track: trackItem.title, uri: videos[index].uri })
                } else {
                    newTracklistsObject.push({ track: trackItem.title, uri: 'null' })
                }
            })

            // const tracklists = responseJson.tracklist

            this.setState({ tracklistsObject: newTracklistsObject, images: data.images, genres: data.genres, year: data.year, title: data.title })
        })
    }

    render () {
        return (

            <div id='divContainerDetail' className='container'>

                <DetailsAlbumRechercheComponent imageAlbum={(this.state.images.length > 0 ? this.state.images[0].uri : '')} genreAlbum={(this.state.genres.length > 0 ? this.state.genres[0] : 'Inconnu')} yearAlbum={this.state.year} titleAlbum={this.state.title} />
                <div id='divColonneTrack'>
                    {this.state.tracklistsObject.map((item, index) => <DetailsRechercheComponent title={item.track} masterId={this.props.masterId} youtubeUri={item.uri} key={index} onClick={this.handleSaveTrackToPlayList} />)}

                </div>

            </div>

        )
    }
}

export default DetailsRechercheContainer
