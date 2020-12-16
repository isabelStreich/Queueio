import React, { useState, useEffect } from "react";
import NavBarCommercant from "../component/navbar-commercant-component";
import Logo from "../logo.svg";
function PageConfigurationCommerceContainer(props) {
    const commerceId = (props.location && props.location.state) || 3;

    const [filtres, setFiltres] = useState([]);
    const [isFirstTime, setIsFirstTime] = useState(true);
	const [employe, setEmploye] = useState({
		nom: "John",
		courriel: "abc@mail.com",
		mot_passe: "badoing"
	});
	const [horaire, setHoraire] = useState({
		horaire_ouverture: "08:00",
		horaire_fermeture: "22:00"
	});	
	const [horaireBackup, setHoraireBackup] = useState([]);	// envoyer a l'API quand PUT
    const [employeBackup, setEmployeBackup] = useState([]); //envoyer a l'API quand PUT
    const [filtreCommerce, setfiltreCommerce] = useState(""); //envoyer a l'API quand PUT

    const [commerceConfig, setCommerceConfig] = useState({
        filtre_id: "1",
        couleur: "#C1BBBA",
		employee_id: "2",
		logo: "logo",
        nb_clients_max: "10",
        horaire_id: "2",
        nb_minutes_retard: "5",
        temps_moyen_clients: "10",
    });
    const [commerceConfigBackup, setCommerceConfigBackup] = useState({
        filtre_id: "1",
        couleur: "#C1BBBA",
		employee_id: "2",
		logo: "logo",
        nb_clients_max: "10",
        horaire_id: "2",
        nb_minutes_retard: "5",
        temps_moyen_clients: "10",
    }); //envoyer a l'API quand PUT

    const [commerceInfo, setCommerceInfo] = useState({
        nom: "RBC",
        adresse: "123 rue maisoneyve",
        courriel: "apple@mail.com",
        mot_passe: "apple123",
    });

    const [commerceInfoBackup, setCommerceInfoBackup] = useState({
        nom: "RBC",
        adresse: "123 rue maisoneyve",
        courriel: "apple@mail.com",
        mot_passe: "apple123",
    }); //envoyer a l'API quand PUT

    useEffect(() => {
        async function fetchData() {
			await fetchCommerceInfo();
            await fetchCommerceConfig();
            await fetchFiltres();
			await fetchEmploye();
			await fetchHoraire();
		}

        fetchData();

        //request for commerce config
        async function fetchCommerceConfig() {
            const response = await fetch(
                "https://queueio.herokuapp.com/commerceConfigId/".concat(
                    commerceId
                )
            );
            const liste = await response.json();
            if (liste !== undefined && liste.length !== 0) {				
                liste[0].couleur = "#".concat(liste[0].couleur);
                setCommerceConfig(liste[0]);
				setCommerceConfigBackup(liste[0]);
				setfiltreCommerce(liste[0].filtre_id);
				setIsFirstTime(false);
            }
        }

        // //request for commerce info
        async function fetchCommerceInfo() {
            const response = await fetch(
                "https://queueio.herokuapp.com/commerceById/".concat(commerceId)
            );
            const liste = await response.json();
            if (liste !== undefined && liste.length !== 0) {				
                setCommerceInfo(liste[0]);
				setCommerceInfoBackup(liste[0]);
			}
        }

        // //   //request for filtres
        async function fetchFiltres() {
            const response = await fetch(
                "https://queueio.herokuapp.com/filtre"
            );
            const liste = await response.json();
            setFiltres(liste);
        }

        // //   //request for employe
        async function fetchEmploye() {
            const response = await fetch(
                "https://queueio.herokuapp.com/employeByIdCommerce/".concat(
                    commerceId
                )
            );
			const liste = await response.json();
			if (liste !== undefined && liste.length !== 0) {				
                setEmploye(liste[0]);
            	setEmployeBackup(liste[0]);
			}
            
		}
		
		// //   //request for horaire
        async function fetchHoraire() {
            const response = await fetch(
                "https://queueio.herokuapp.com/horaire/".concat(
                    commerceId
                )
            );
			const liste = await response.json();
			if (liste !== undefined && liste.length !== 0) {				
                setHoraire(liste[0]);
            	setHoraireBackup(liste[0]);
			}						
            
        }
	}, []);

    const onChangeHandler = (e) => {
        console.log(e.target.name);
        switch (e.target.name) {
            case "nom":
            case "adresse":
            case "courriel":
            case "mot_passe":
                setCommerceInfo({
                    ...commerceInfo,
                    [e.target.name]: e.target.value
                });
                break;
            case "filtre_id":
				setfiltreCommerce(e.target.value);                
                setCommerceConfig({
                    ...commerceConfig,
                    filtre_id: e.target.value
                });
                break;
            case "couleur":
            case "nb_clients_max":
            case "horaire_id":
            case "nb_minutes_retard":
            case "temps_moyen_clients":
                setCommerceConfig({
                    ...commerceConfig,
                    [e.target.name]: e.target.value.trim()
                });
                break;
            case "employe_courriel":
                setEmploye({
                    ...employe,
                    courriel: e.target.value.trim()
                });
                break;
            case "employe_mot_passe":
                setEmploye({
                    ...employe,
                    mot_passe: e.target.value.trim()
                });
				break;
			case "horaire_ouverture":
			case "horaire_fermeture":
				setHoraire({
                    ...horaire,
                    [e.target.name]: e.target.value.trim()
				});
				break;
			default:
				break;

        }
    };

    const onClickHandler = (e) => {
        switch (e.target.name) {
            case "annuler":
				console.log(commerceConfigBackup);
                setCommerceConfig(commerceConfigBackup);
				setCommerceInfo(commerceInfoBackup);
				setEmploye(employeBackup);
				setHoraire(horaireBackup)
                console.log("btn annuler");
				break;	
			default:
				break;			
        }
    };

    const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log("commerce info :" , commerceInfo);
		console.log("commerce config :" , commerceConfig);
		console.log("employe :" , employe);
		console.log("horaire :" , horaire);

		async function sendData() {
            await sendCommerceConfig();
            await sendCommerceInfo();
            await sendHoraire();
			await sendEmployee();
		}
		console.log(isFirstTime);

		sendData();		

        async function sendCommerceConfig() {			
            const response = await fetch(
                "https://queueio.herokuapp.com/commerceConfig/" + commerceConfig.filtre_id + "/" + commerceConfig.logo + "/" + commerceConfig.couleur.substring(1) + "/" + commerceConfig.nb_minutes_retard + "/" + commerceConfig.nb_clients_max + "/" + commerceConfig.temps_moyen_clients + "/" + commerceId, {
					method: isFirstTime ? 'POST' :  'PUT' 
				}                
            );
            const liste = await response.json();
            console.log(liste);
		}
		
		async function sendCommerceInfo() {
            const response = await fetch(
                "https://queueio.herokuapp.com/commerceupdate/" + commerceInfo.nom + "," + commerceInfo.adresse + "," + commerceInfo.courriel + "," + commerceInfo.mot_passe  + "," + commerceId, {
					method: 'PUT'
				}                    
            );
            const liste = await response.json();
            console.log(liste);
		}
		
		async function sendHoraire() {
            const response = await fetch(
                "https://queueio.herokuapp.com/horaire/" + horaire.horaire_ouverture + "/" + horaire.horaire_fermeture + "/" + commerceId, {
					method: isFirstTime ? 'POST' :  'PUT'
				}          
            );
            const liste = await response.json();
            console.log(liste);
		}
		
		async function sendEmployee() {
			let employeeMethode;
			if(isFirstTime){
               
				employeeMethode =  "https://queueio.herokuapp.com/employecreation/" + employe.nom + "/"  + employe.courriel + "/"  + employe.mot_passe + "/"  + commerceId;
			}
			else{
                employeeMethode =  "https://queueio.herokuapp.com/updateemployee/" + employe.nom + ","  + employe.courriel + ","  + employe.mot_passe + ","  + commerceId;
            }
				
            const response = await fetch(
                employeeMethode, {
					method: isFirstTime ? 'POST' :  'PUT'
				}          
            );
            const liste = await response.json();
            console.log(liste);
        }     
        
        alert("Les modifications ont été sauvegardées!");
	};
	
	//https://queueio.herokuapp.com/employeCreation/john/micro@mail.com/123/7
	//https://queueio.herokuapp.com/employecreation/John,carr4@mail.com,shopping,8

    return (
        <div>
            <NavBarCommercant commerceId={commerceId} props={props} />

            <p>Commerce ID : {commerceId}</p>

            <div id="divFormulaire">
                <form onSubmit={onSubmitHandler} className="form-config">
                    <h1>Configuration du Commerce</h1>
                    <fieldset className="fieldset-config">
                        <div className="logo">
                            <img className="logo-commerce" alt="" src={Logo} />
                        </div>

                        <div className="nomDuCommerce">
                            <label htmlFor="nom">Nom Du Commerce</label>
                            <input
                                className="form-control mb-4"
                                value={commerceInfo.nom || ""}
                                type="text"
                                id="nomDuCommerce"
                                name="nom"
                                onChange={onChangeHandler}
                                required="required"
                                maxLength="50"
                                autoFocus
                            />
                        </div>

                        <div className="adresse">
                            <label htmlFor="adresse">Adresse</label>
                            <input
                                className="form-control mb-4"
                                id="adresse"
                                value={commerceInfo.adresse || ""}
                                name="adresse"
                                maxLength="100"
                                onChange={onChangeHandler}
                                required
                            />
                        </div>

                        <div className="email">
                            <label htmlFor="courriel">Email</label>
                            <input
                                className="form-control mb-4"
                                value={commerceInfo.courriel || ""}
                                type="email"
                                name="courriel"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="password">
                            <label htmlFor="mot_passe">Password</label>
                            <input
                                className="form-control mb-4"
                                type="text"
                                value={commerceInfo.mot_passe || ""}
                                name="mot_passe"
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div className="filtre">
                            <label htmlFor="filtre_id">
                                La catégorie de votre commerce
                            </label>
                            <select
                                name="filtre_id"
                                className="form-control mb-4"
                                value={filtreCommerce || ""}
                                id="filtre"
                                onChange={onChangeHandler}>
                                {filtres.map((filtre, index) => (
                                    <option key={index} value={filtre.id}>
                                        {filtre.nom_filtre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="color">
                            <label htmlFor="couleur">
                                La couleur thème de votre commerce
                            </label>
                            <input
                                className="form-control mb-4"
                                type="color"
                                value={commerceConfig.couleur || ""}
                                name="couleur"
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div className="employeeEmail">
                            <label htmlFor="employee_id">
                                Le courriel utilisé pour la connexion de
                                l'employé
                            </label>
                            <input
                                className="form-control mb-4"
                                type="text"
                                value={employe.courriel || ""}
                                name="employe_courriel"
                                onChange={onChangeHandler}
                            />
                        </div>

                        <div className="employeePassword">
                            <label htmlFor="employeePassword">
                                Le mot de passe utilisé pour la connexion de
                                l'employé
                            </label>
                            <input
                                className="form-control mb-4"
                                type="text"
                                value={employe.mot_passe || ""}
                                name="employe_mot_passe"
                                onChange={onChangeHandler}
                            />
                        </div>

                        {/* <div className='checkbox'>
                            <label htmlFor="validationClient">Demander une validation au client(sms)</label>
                            <input type="checkbox" id="validationClient" name="validation" onChange={onChangeHandler}/>
                        </div> */}

                        <div className="maxClientDansCommerce">
                            <label htmlFor="nb_clients_max">
                                Maximum de clients dans le commerce
                            </label>
                            <input
                                className="form-control mb-4"
                                type="text"
                                id="maxClientDansCommerce"
                                value={commerceConfig.nb_clients_max || ""}
                                name="nb_clients_max"
                                onChange={onChangeHandler}
                                required="required"
                                maxLength="50"
                            />
                        </div>
                        <div className="horaireOuverture">
                            <label htmlFor="horaire_ouverture">
                                Horaire d'Ouverture:
                            </label>
                            <input
                                type="time"
                                className="form-control mb-4"
                                id="horaire_ouverture"
                                value={horaire.horaire_ouverture || ""}
                                name="horaire_ouverture"
                                onChange={onChangeHandler}
                                min="06:00"
                                max="23:00"
                                required
                            ></input>
                        </div>
                        <div className="horaire_fermeture">
                            <label htmlFor="horaire_fermeture">
                                Horaire de fermeture:
                            </label>
                            <input
                                type="time"
                                className="form-control mb-4"
                                id="horaire_fermeture"
                                value={horaire.horaire_fermeture || ""}
                                name="horaire_fermeture"
                                onChange={onChangeHandler}
                                min="06:00"
                                max="23:00"
                                required
                            ></input>
                        </div>
                        <div className="maxMinuteRetard">
                            <label htmlFor="nb_minutes_retard">
                                Le temps maximum d'attente de retard (en
                                minutes)
                            </label>
                            <input
                                type="number"
                                className="form-control mb-4"
                                id="maxMinuteRetard"
                                value={commerceConfig.nb_minutes_retard || ""}
                                min="0"
                                name="nb_minutes_retard"
                                onChange={onChangeHandler}
                                required="required"
                                maxLength="50"
                            />
                        </div>

                        <div className="tempsMoyenClient">
                            <label htmlFor="temps_moyen_clients">
                                Le temps moyen qu'un client passe dans le
                                commerce (en minutes)
                            </label>
                            <input
                                type="number"
                                className="form-control mb-4"
                                id="tempsMoyenClient"
                                value={commerceConfig.temps_moyen_clients || ""}
                                min="0"
                                name="temps_moyen_clients"
                                onChange={onChangeHandler}
                                required="required"
                                maxLength="50"
                            />
                        </div>

                        <div id="submit">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg btn-block"
                            >
                                Sauvegarder les modifications
                            </button>
                        </div>
                    </fieldset>
                </form>

                <div id="quitter">
                    <button
                        className="btn btn-secondary btn-lg btn-block"
                        name="annuler"
                        onClick={onClickHandler}
                    >
                        Annuler les modifications
                    </button>
                </div>
                <div className="bottom-space">Some text</div>
            </div>
        </div>
    );
}

export default PageConfigurationCommerceContainer;
