import React from 'react'

const NAVBAR = () => (
    <div>
        <header className="App-header">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">queue.io</a>     

          <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Accueil <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Commerce</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Se connecter</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
)

export default NAVBAR
