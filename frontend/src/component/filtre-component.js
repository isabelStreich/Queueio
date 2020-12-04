import React, {useState, useEffect} from 'react'
import Filtres from '../filtres.json'
import ListeCommerces from '../liste-commerces.json'

const FILTRE = props => {
 
  const [filtreUnique, setfiltreUnique] =  useState([]);

  useEffect(() => {
    const filtresActifs = [];
    ListeCommerces.forEach(commerce => {
      if (!filtresActifs.find(f => f === commerce.filtre_id)){
            filtresActifs.push(commerce.filtre_id)
      }      
    });
    setfiltreUnique(filtresActifs)
  }, []);


  return(
      <div className="card bg-light mb-3" id="filtre-commerce">
          <div className="card-header">Filtrer par type de commerces</div>
          <div className="card-body">
            <h5 className="card-title">Catégories</h5>
            <div className="form-check">
              {Filtres.filter(f => filtreUnique.find(fu => fu === f.id)).map((filtre, index) => 
              <div className="label-filtre" key={index}>
                <input className="form-check-input" type="radio" name="filtre" id={filtre.id} value={filtre.nom} onChange={() => props.onChangeHandler(filtre.id)} ></input>
                <label className="form-check-label" htmlFor={filtre.id}>{filtre.nom}</label>
              </div> )}    
              <div className="label-filtre">
                <input className="form-check-input" type="radio" name="filtre" id="clearFiltre" value="Tous" onChange={() => props.onChangeHandler("clear")} ></input>
                <label className="form-check-label" htmlFor="clearFiltre">Tous</label>
              </div>           
            </div>
          </div>
        </div>
  )
}
export default FILTRE

