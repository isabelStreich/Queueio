import React, {useState, useEffect} from 'react'
import Filtres from '../filtres.json'
import ListeCommerces from '../liste-commerces.json'

const FILTRE = props => {
 
  const [filtreUnique, setfiltreUnique] =  useState([]);
  const [listeFiltres, setListeFiltres] = useState([]);

  useEffect(() => {

    async function fetchData() {
      await fetchFiltres();
    }
    fetchData();

    //fetch filtres
    async function fetchFiltres() {
      const response = await fetch(
          "https://queueio.herokuapp.com/filtre"
      );
      const liste = await response.json();
      console.log(liste);
      setListeFiltres(liste);
    }


    // const filtresActifs = [];
    // ListeCommerces.forEach(commerce => {
    //   if (!filtresActifs.find(f => f === commerce.filtre_id)){
    //         filtresActifs.push(commerce.filtre_id)
    //   }      
    // });
    // setfiltreUnique(filtresActifs)
  }, []);


  return(
      <div className="card bg-light mb-3" id="filtre-commerce">
          <div className="card-header">Filtrer par type de commerces</div>
          <div className="card-body">
            <h5 className="card-title">Catégories</h5>
            <div className="form-check">              
              <div className="label-filtre">
                {listeFiltres.map((filtre, index) => (
                  <div key={index} className="filtres-label">
                    <input className="form-check-input" type="radio" id={filtre.id} name="filtre" value={filtre.nom_filtre} onChange={() => props.onChangeHandler(filtre.id)}/>
                    <label className="form-check-label" htmlFor={filtre.id}>{filtre.nom_filtre}</label>
                  </div>
                  )
                )}
                <div className="filtres-label">
                  <input className="form-check-input" type="radio" name="filtre" id="clearFiltre" value="Tous" onChange={() => props.onChangeHandler("clear")} ></input>
                  <label className="form-check-label" htmlFor="clearFiltre">Tous</label>
                </div>
              </div>             
                                       
            </div>
          </div>
        </div>
  )
}
export default FILTRE

