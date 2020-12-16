import React from 'react'
import './App.css'
import PageListeCommerces from './container/page-liste-commerces-container'
import PageInscriptionClient from'./component/inscription-client-component'
import PageFileAttente from './container/page-file-attente-container'
import PageLogin from './container/page-login-container'
import PageInscription from './container/page-inscription-container'
import PageCommerceConfig from './container/page-configuration-commerce-container'
import PageStatistiqueContainer from './container/page-statistique-container'
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from 'react-router-dom'
import {createBrowserHistory} from 'history'

function App() {

  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route component={PageInscriptionClient} path="/info-client"/>

          <Route component={PageFileAttente} path="/file-attente"/>

          <Route component={PageLogin} path="/login"/>         

          <Route component={PageInscription} path="/inscription"/>

          <Route component={PageCommerceConfig} path="/commerceConfig"/>          

          <Route component={PageStatistiqueContainer} path="/statistique"/>

          <Route component={PageListeCommerces} path="/"/>
        </Switch>       
      </div>
    </Router>
  );
}

export default App;
