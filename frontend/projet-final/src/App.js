import './App.css';
import Navbar from './component/navbar-component'
import Recherche from './component/recherche-commerce-component'
import CarteCommerce from './component/carte-commerce-component'
import Filtre from './component/filtre-component'

function App() {
  return (
    <div className="App">
      <Navbar
      />
      <h1>Bienvenue!</h1>
      <Recherche
      /> 
      <h1 className="liste-commerces">Liste de commerces</h1>     

      <div className="conteneur-commerces">
        <CarteCommerce 
          nom= 'Services Canada'
          nbPersonnesEnFile= ' 10'
          tempsAttenteApprox= ' 35 mins'
        />

        <CarteCommerce 
          nom= 'Services Canada'
          nbPersonnesEnFile= ' 10'
          tempsAttenteApprox= ' 35 mins'
        />

        <CarteCommerce 
          nom= 'Services Canada'
          nbPersonnesEnFile= ' 10'
          tempsAttenteApprox= ' 35 mins'
        />

        <CarteCommerce 
          nom= 'Services Canada'
          nbPersonnesEnFile= ' 10'
          tempsAttenteApprox= ' 35 mins'
        />
      </div>

      <Filtre
      />    

      <p>Lorem ipsum</p>
    </div>
  );
}

export default App;
