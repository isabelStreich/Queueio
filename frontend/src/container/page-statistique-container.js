import {Link} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Navbar from '../component/navbar-commercant-component'

function PageStatistiqueContainer(props){  

    const commerce_id = (props.location && props.location.state) || [];
    
    const [statInfo, setStatInfo] = useState({
        nb_client_jour: "",
        nb_client_mois: "",
        nb_client_annee: "",
        temp_moyen_attendre: "",
        temp_moyen_client_commerce: ""
    });

    useEffect(() =>{
        async function fetchData(){
          const response = await fetch('https://queueio.herokuapp.com/commerceStatistiques/'.concat(commerce_id));
          const stats = await response.json();
          return stats
        }
        fetchData().then(stats =>{
            if(stats !== undefined && stats.length !== 0){                
                console.log("inside");            
                makeStatInfo(stats[0]);
            }
            console.log(stats);
           
        })        
    }, [])

    const makeStatInfo = info =>{
        setStatInfo(info);        
    }

    const onClickHandler = id =>{
        props.history.push({
            pathname: '/commerceConfig',
            state: commerce_id
        })        
    }

    return (
        <div>
            <Navbar/>

            <div className='statistique-wrapper'>
                <p className="h4 mb-4" id="message-stat">Voici votre page de statistiques de votre commerce</p>

                <div className="stat-info">
                    <ul className="list-group" id="texte-stat">
                        <li className="list-group-item">Moyenne de clients par jour</li>
                        <li className="list-group-item">Moyenne de clients par mois</li>
                        <li className="list-group-item">Moyenne de clients par année</li>
                        <li className="list-group-item">Temps moyen d'attente en file (en minutes)</li>
                        <li className="list-group-item">Temps moyen qu'un client passe dans le commerce (en minutes)</li>
                    </ul>
                    <ul className="list-group" id="chiffre-stat">
                        <li className="list-group-item">{statInfo.nb_client_jour}</li>
                        <li className="list-group-item">{statInfo.nb_client_mois}</li>
                        <li className="list-group-item">{statInfo.nb_client_annee}</li>
                        <li className="list-group-item">{statInfo.temp_moyen_attendre}</li>
                        <li className="list-group-item">{statInfo.temp_moyen_client_commerce}</li>
                    </ul>
                </div>               
                    <button type="button" className="btn btn-info btn-block my-4" id="btn-stat" onClick={onClickHandler}>Retour au profil</button>                           
            </div>
        </div>
    );
}

export default PageStatistiqueContainer;
