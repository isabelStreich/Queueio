import React, {useState, useEffect} from 'react';
import '../App.css';
import Navbar from '../component/navbar-component'
import CarteCommerce from '../component/carte-commerce-component'
import Filtre from '../component/filtre-component'
import ListeCommerces from '../liste-commerces.json'

function PageListeCommerces() {

  const [search, setSearch] =  useState("");
  const [activeFilter, setActiveFilter] =  useState("clear");

  const [maListeCommerces, setMaListeCommerces] =  useState(ListeCommerces);


  useEffect(() => {
    let searchResult = ListeCommerces.filter(commerce => commerce.nom_compagnie.toLowerCase().includes(search.toLowerCase()));
    if (activeFilter !== "clear") searchResult = searchResult.filter(commerce => commerce.filtre_id === activeFilter);    
    setMaListeCommerces(searchResult);    
  }, [search,activeFilter]);

  const onChangeHandler = id =>{
    console.log(id);
    setActiveFilter(id);    
  }

  const fetchNombreClientsCommerceId = id =>{
    let clients = localStorage.getItem("clients"); 
    if(clients){
      clients = JSON.parse(clients).filter(client => client.id_commerce === id ); 
      return clients.length  
    }
    else return 0     
  } 

  return (
    <div>
      <Navbar
      />
      <h1>Bienvenue!</h1>

      <input type="text" className="form-control" id="input-recherche" value={search} placeholder="Rechercher des commerces" onChange={e=>setSearch(e.target.value)}></input>      
     
      <h1 className="liste-commerces">Liste de commerces</h1>     

      <div className="vue-commerces">

        <div className="div-filtre">
          <Filtre
            onChangeHandler = {onChangeHandler}          
          />    
        </div>

        <div className="conteneur-commerces">
          {maListeCommerces.map((commerce, index) => <CarteCommerce nom={commerce.nom_compagnie} id={commerce.id} addresse={commerce.addresse} key={`commerce-${index}`} nbPersonnesEnFile={fetchNombreClientsCommerceId(commerce.id)} tempsAttenteApprox = {fetchNombreClientsCommerceId(commerce.id) * 5}   /> )}      
        </div>
      </div>
    </div>
  );
}

export default PageListeCommerces;