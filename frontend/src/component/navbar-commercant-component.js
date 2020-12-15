import React from 'react'
import {Link} from 'react-router-dom'

const NAVBAR = ({commerceId,props}) =>{

  const onClickHandler = e =>{

      props.history.push({
        pathname: '/statistique',
        state: commerceId
    })
  }

  return(
      <div>
          <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

          <Link to="/"className="navbar-brand">
              queue.io
          </Link>  

            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                <Link to="/CommerceConfig"className="nav-link">
                    Accueil - Profil <span className="sr-only">(current)</span>
                </Link>                
                </li>
                <li className="nav-link active" id="stat-link" onClick={onClickHandler}>                  
                      Statistiques                  
                </li>
                <li className="nav-item active">
                  <Link to="/" className="nav-link">
                      Se déconnecter
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
  )
}

export default NAVBAR
