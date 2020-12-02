const manager = require('../manager/manager_post')

const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'


const commerceConfiguration = (req, res) => {
    // filtreId,statistiqueId,logo,couleurId,horaireId,nbMinutesRetard,nbClientsMax,tempsMoyenClients,employeeId,serviceId,commerceId
    // filtre_id,statistique_id,logo,couleur_id,horaire_id,nb_minutes_retard,nb_clients_max,temps_moyen_clients,employee_id,service_id,commerce_id
    const filtreId = req.params.filtre_id
    const statistiqueId = req.params.statistique_id
    const logo = req.params.logo
    const couleurId = req.params.couleur_id
    const horaireId = req.params.horaire_id
    const nbMinutesRetard = req.params.nb_minutes_retard
    const nbClientsMax = req.params.nb_clients_max
    const tempsMoyenClients = req.params.temps_moyen_clients
    const employeeId = req.params.employee_id
    const serviceId = req.params.service_id
    const commerceId = req.params.commerce_id

    //  // nom_commerce_list, nom_client, nom_cpt_client, cpt_client_servi,cpt_client_quitter,id_commerce
    // // nomCommerceList, nomClient, nomCptClient, cptClientServi,cptClientQuitter
    const nomCommerceList = 'commerce'+commerceId+'List'
    const nomClient = 'commerce'+commerceId+'Client'
    const nomCptClient = 'commerce'+commerceId+'Cpt'
    const cptClientServi = 'commerce'+commerceId+'CptServi'
    const cptClientQuitter = 'commerce'+commerceId+'CptQuitter'
    // ,nomCommerceList, nomClient, nomCptClient, cptClientServi,cptClientQuitter
    
    manager.commerceConfiguration.getData(filtreId,statistiqueId,logo,couleurId,horaireId,nbMinutesRetard,nbClientsMax,tempsMoyenClients,employeeId,serviceId,commerceId,nomCommerceList, nomClient, nomCptClient, cptClientServi,cptClientQuitter).then(result => {
        sendData(res, result)
    })
}
const commerceInscription = (req, res) => {
    const nom = req.params.nom
    const adresse = req.params.adresse
    const courriel = req.params.courriel
    const mot_passe = req.params.mot_passe
    manager.commerceInscription.getData(nom,adresse,courriel,mot_passe).then(result => {
        sendData(res, result)
    })
}
const login = (req, res) => {
    const courriel = req.params.courriel
    const mot_passe = req.params.mot_passe
    manager.login.getData(courriel,mot_passe).then(result => {
        sendData(res, result)
    })
}

const employecreation = (req, res) => {
    const nom = req.params.nom
    const courriel = req.params.courriel
    const mot_passe = req.params.mot_passe
    const id_commerce = req.params.id_commerce
    manager.employecreation.getData(nom,courriel,mot_passe,id_commerce).then(result => {
        sendData(res, result)
    })
}

const servicesCreation = (req, res) => {
    const nomService = req.params.nom_service
    const dureeAprox = req.params.duree_aprox
    
    manager.servicesCreation.getData(nomService,dureeAprox).then(result => {
        sendData(res, result)
    })
}

module.exports = {
    commerceInscription,
    login,
    employecreation,
    servicesCreation,
    commerceConfiguration
}