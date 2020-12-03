import React from 'react'
import './App.css'
import PageListeCommerces from './container/page-liste-commerces-container'
import PageInscriptionClient from'./container/page-inscription-client-container'
import PageFileAttente from './container/page-file-attente-container'
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from 'react-router-dom'


function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/info-client">Info</Link>
        <Link to="/file-attente">File</Link>
        <Switch>
          <Route path="/info-client/:commerceId">
            <PageInscriptionClient/>
          </Route>

          <Route path="/file-attente">
            <PageFileAttente/>
          </Route>

          <Route path="/">
            <PageListeCommerces/>
          </Route>
        </Switch>
        
        
      </div>
    </Router>
  );
}

export default App;
