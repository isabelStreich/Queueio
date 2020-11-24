
import React from 'react'

function renderLi(buttons, index) {
    return (

        <li class='nav-item active' key={index}>

            <a class='nav-link' onClick={buttons.handleOnClick} href=''>{buttons.label}<span class='sr-only' /></a>

        </li>

    )
}

function optionRender(genre, index) {
    return <option value={genre.id} key={index}>{genre.title}</option>
}

const NavBarComponent = ({ onSubmit, genres, buttons }) => (

    <div className=''>

        <nav id='navbarComplete' class='navbar fixed-top navbar navbar-expand-xl   '>

            <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarTogglerDemo03' aria-controls='navbarTogglerDemo03' aria-expanded='false' aria-label='Toggle navigation'>

                <span class='navbar-toggler-icon' />

            </button>

            <div class='navbar-brand' id='divLogo'>

                <a id='titreLogo' href='#'>

                    <p>Queue.io</p>

                </a>

                <a id='lienLogo' class='navbar-brand' href='#'>

                    <img id='logoSite' src='image/peoples_queue.JPG.jpg' alt='logo du site' />

                </a>

            </div>

            <div class='collapse navbar-collapse' id='navbarTogglerDemo03'>

                <ul id='listNavbar' class='navbar-nav mr-auto mt-2 mt-sm-0'>

                    {buttons.map((buttons, index) => renderLi(buttons, index))}

                </ul>

                <div id='divSelectPlaylist'>

                    <div class='input-group'>

                        <select class='custom-select' id='inputGroupSelect04'>

                            <option selected value='-1'>choisir playlist</option>

                            {genres.map((genre, index) => optionRender(genre, index))}

                        </select>

                        {/* <div class='input-group-append'>

                            <button id='btnPlaylist' class='btn btn-outline-secondary' type='button'>Afficher</button>

                        </div> */}

                    </div>

                </div>
                {/* barre de recherche des commerces */}
                <form onSubmit={onSubmit} id='formRecherche' class='form-inline my-2 my-xl-0'>


                    <input id='barreRecherche' class='form-control mr-sm-2' type='search' placeholder='artist,album,titre...' aria-label='Search' />

                    <button id='btnRecherche' class='btn btn-outline-success my-2 my-sm-0' type='submit'>Rechercher</button>

                </form>

            </div>

        </nav>

    </div>

)

export default NavBarComponent
