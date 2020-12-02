import React from 'react';
import '../App.css';
import Navbar from '../component/navbar-component'
import Recherche from '../component/recherche-commerce-component'
import CarteCommerce from '../component/carte-commerce-component'
import Filtre from '../component/filtre-component'
import ListeCommerces from '../liste-commerces.json'



function PageListeCommerces() {
  return (
    <div>
      <Navbar
      />
      <h1>Bienvenue!</h1>
      <Recherche
      /> 
      {console.log(ListeCommerces)}
      <h1 className="liste-commerces">Liste de commerces</h1>     

      <div className="vue-commerces">

        <div className="div-filtre">
          <Filtre
          />    
        </div>

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
       

      </div>

      <p>Lorem ipsum</p>
    </div>
  );
}

export default PageListeCommerces;