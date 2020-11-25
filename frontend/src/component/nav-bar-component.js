
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
        </nav>

    </div >

)

export default NavBarComponent
