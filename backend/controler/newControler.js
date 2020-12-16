const newManager = require('../manager/newManager')

const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'

const sendData = (res, searchJsonData) => {
    res.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    res.end(JSON.stringify(searchJsonData, null, 4))
}

const commerceById = (req, res) => {
    const comerceID = req.params.commerce_id
    if(!isNaN(comerceID)) {
        newManager.commerceById.getData(comerceID).then(result => {
            sendData(res, result)
        }).catch(err => console.error('connection error', err.stack))
    }else{
        let result = {code : 404, msg: "not a number for parameter"};
        sendData(res, result);
    }
}

const commerceConfigId = (req, res) => {
    const comerceID = req.params.commerce_id
    if(!isNaN(comerceID)) {
        newManager.commerceConfigId.getData(comerceID).then(result => {
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}else{
    let result = {code : 404, msg: "not a number for parameter"};
    sendData(res, result);
}
}

const employeByIdCommerce = (req, res) => {
    const comerceID = req.params.id_commerce
    if(!isNaN(comerceID)) {
        newManager.employeByIdCommerce.getData(comerceID).then(result => {
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}else{
    let result = {code : 404, msg: "not a number for parameter"};
    sendData(res, result);
}
}
const commerceStatistiques = (req, res) => {
    const comerceStatique = req.params.commerce_id

    if(!isNaN(comerceStatique)) {
    newManager.commerceStatistiques.getData(comerceStatique).then(result => {
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}else{
    let result = {code : 404, msg: "not a number for parameter"};
    sendData(res, result);
}
}
const horaireByIdCommerce = (req, res) => {
    const comerceID = req.params.commerce_id

    newManager.horaireByIdCommerce.getData(comerceID).then(result => {
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}
const login = (req, res) => {
    const courriel = req.params.courriel
    const mot_passe = req.params.mot_passe
    if(courriel !== req.params.courriel && mot_passe !== req.params.mot_passe){
        newManager.login.getData(courriel,mot_passe).then(result => {
            sendData(res, result)
        }).catch(err => console.error('connection error', err.stack))
    }else{
        let result = {code : 404, msg: "Courriel ou mot de passe ne sont pas corrects!"};
        sendData(res, result);
    }
    
}
const loginEmployee = (req, res) => {
    const courriel = req.params.courriel
    const mot_passe = req.params.mot_passe
    newManager.loginEmployee.getData(courriel,mot_passe).then(result => {
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}

const commerceFiltre = (req, res) => {
    const comerceFiltreID = req.params.filtre_id
    newManager.commerceFiltre.getData(comerceFiltreID).then(result => {
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}
const filtre = (req, res) => {

    newManager.filtre.getData().then(result => {
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}

//POST

const commerceInscription = (req, res) => {
    const nom = req.params.nom
    const adresse = req.params.adresse
    const courriel = req.params.courriel
    const motPasse = req.params.mot_passe

    if(nom !== null && adresse !== null && courriel !== null&& motPasse !== null){

    newManager.commerceInscription.getData(nom,adresse,courriel,motPasse).then(result => {
        result = {code : 200, msg: "Le commerce a été correctement enregistrée!"};
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
} if(nom === ''|| adresse === ''||  courriel === ''||  motPasse === ''){
    let result = {code :404, msg: "Tous les champs doivent être remplis!! Le commerce n'est pas cree!"};
    sendData(res, result);
}
}
const commerceConfig = (req, res) => {
   
    const filtreId = req.params.filtre_id
    const logo = req.params.logo
    const couleur = req.params.couleur
    const nbMinutesRetard = req.params.nb_minutes_retard
    const nbClientsMax = req.params.nb_clients_max
    const tempsMoyenClients = req.params.temps_moyen_clients
    const comerceID = req.params.commerce_id

    const nomCommerceList = 'commerce'+comerceID+'List'
    const nomClient = 'commerce'+comerceID+'Client'
    const nomCptClient = 'commerce'+comerceID+'Cpt'
    const cptClientServi = 'commerce'+comerceID+'CptServi'
    const cptClientQuitter = 'commerce'+comerceID+'CptQuitter'

    newManager.commerceConfig.getData(filtreId,logo,couleur,nbMinutesRetard,nbClientsMax,tempsMoyenClients,nomCommerceList, nomClient, nomCptClient, cptClientServi,cptClientQuitter,comerceID).then(result => {
        result = {code : 200, msg: "Le commerce_config a été correctement enregistrée!"};
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}
const employecreation = (req, res) => {
    const nom = req.params.nom
    const courriel = req.params.courriel
    const mot_passe = req.params.mot_passe
    const id_commerce = req.params.id_commerce

    if(nom !== null && courriel !== null && mot_passe !== null ){
    newManager.employecreation.getData(nom,courriel,mot_passe,id_commerce).then(result => {
        result = {code : 200, msg: "L'employee a été cree!" };
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
    }else{
    let result = {code :404, msg: "ERR: Employee n'est pas cree!"};
    sendData(res, result);
    }
}
const horaire = (req, res) => {
    const horaireOuverture = req.params.horaire_ouverture
    const horaireFermeture = req.params.horaire_fermeture
    const comerceID = req.params.commerce_id
    
    if(horaireOuverture !== null && horaireFermeture !== null && comerceID !== null ){
    newManager.horaire.getData(horaireOuverture,horaireFermeture,comerceID).then(result => {
        result = {code : 200, msg: "L'horaire a été cree!" };
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}else{
    let result = {code :404, msg: "ERR: Horaire n'est pas cree!"};
    sendData(res, result);
    }
}
const statistique = (req, res) => {
    // nb_client_jour,nb_client_mois,nb_client_annee,temp_moyen_attendre,temp_moyen_client_commerce,commerce_id
    // nbClientJour,nbClientMois,nbClientAnnee,tempMoyenAttendre,tempMoyenClientCommerce,commerceID
    const nbClientJour = req.params.nb_client_jour
    const nbClientMois = req.params.nb_client_mois
    const nbClientAnnee = req.params.nb_client_annee
    const tempMoyenAttendre = req.params.temp_moyen_attendre
    const tempMoyenClientCommerce = req.params.temp_moyen_client_commerce
    const comerceID = req.params.commerce_id
    
    if(nbClientJour !== null && nbClientMois !== null && nbClientAnnee !== null && tempMoyenAttendre !== null && tempMoyenClientCommerce !== null && comerceID !== null ){
    newManager.statistique.getData(nbClientJour,nbClientMois,nbClientAnnee,tempMoyenAttendre,tempMoyenClientCommerce,comerceID).then(result => {
        result = {code : 200, msg: "Le statistique a été cree!" };
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}else{
    let result = {code :404, msg: "ERR: statistique n'est pas cree!"};
    sendData(res, result);
    }
}

//PUT
const updateHoraire = (req, res) => {
    const horaireOuverture = req.params.horaire_ouverture
    const horaireFermeture = req.params.horaire_fermeture
    const comerceID = req.params.commerce_id
    
    newManager.updateHoraire.getData(horaireOuverture,horaireFermeture,comerceID).then(result => {
        result = {code : 200, msg: "Les modifications  de votre horaire ont été enregistrées!" };
        sendData(res, result)
    }).catch(err => console.error('connection error', err.stack))
}

const updateCommerce=(req,res)=>{
    const nom=req.params.nom
    const adress=req.params.adresse
    const courriel=req.params.courriel
    const motPasse=req.params.mot_passe
    const id=req.params.id

    if(nom !==null && adress !==null && courriel !==null && motPasse !==null ){
        newManager.updateCommerce.getData(nom,adress,courriel,motPasse,id).then(result=>{
        result = {code : 200, msg: "Les modifications  de votre commerce ont été enregistrées!" };
        sendData(res,result)
    }).catch(err => console.error('connection error', err.stack))
}
}
const updateCommerceConfig=(req,res)=>{
   // nb_clients_max
// nbClientsMax
    const filtreId=req.params.filtre_id
    const logo=req.params.logo
    const couleur=req.params.couleur
    const nbMinutesRetard=req.params.nb_minutes_retard
    const nbClientsMax=req.params.nb_clients_max
    const tempsMoyenClients=req.params.temps_moyen_clients
    const commerceId=req.params.commerce_id
    

    if(filtreId !==null || logo !==null || couleur !==null || nbMinutesRetard !==null || nbClientsMax !==null || tempsMoyenClients !==null){
        newManager.updateCommerceConfig.getData(filtreId,logo,couleur,nbMinutesRetard,nbClientsMax,tempsMoyenClients,commerceId).then(result=>{
        result = {code : 200, msg: "Les modifications  de votre commerce_config ont été enregistrées!" };
            sendData(res,result)
    }).catch(err => console.error('connection error', err.stack))
}
}
const updateemployee=(req,res)=>{
    const nom=req.params.nom
    const courriel=req.params.courriel
    const motPasse=req.params.mot_passe
    const id=req.params.id_commerce

    if(nom !==null && courriel !==null && motPasse !==null){
        newManager.updateemployee.getData(nom,courriel,motPasse,id).then(result=>{
            result = {code : 200, msg: "Les modifications  de votre employee ont été enregistrées!" };
            sendData(res,result)
        }).catch(err => console.error('connection error', err.stack))
    }
    
}
const updateStatistique=(req,res)=>{
    const nbClientJour=req.params.nb_client_jour
    const nbClientMois=req.params.nb_client_mois
    const nbClientAnnee=req.params.nb_client_annee
    const tempMoyenAttendre=req.params.temp_moyen_attendre
    const tempMoyenClientCommerce=req.params.temp_moyen_client_commerce
    const id=req.params.commerce_id

    if(nbClientJour !==null && nbClientMois !==null && nbClientAnnee !==null && tempMoyenAttendre !==null && tempMoyenClientCommerce !==null){
        newManager.updateStatistique.getData(nbClientJour,nbClientMois,nbClientAnnee,tempMoyenAttendre,tempMoyenClientCommerce,id).then(result=>{
        result = {code : 200, msg: "Les modifications de votre statistiques ont été enregistrées!" };
        sendData(res,result)
    }).catch(err => console.error('connection error', err.stack))
}
}

//DELETE

const deleteCommerce=(req,res)=>{
    
    const id=req.params.id
    newManager.deleteCommerce.getData(id).then(result=>{
        sendData(res,result)
    }).catch(err => console.error('connection error', err.stack))
}

//REDIS

const creationcompteur=(req,res)=>{
    newManager.creationcompteur.getData().then(result => {
    sendData(res, result)
}).catch(err => console.error('connection error', err.stack))
}
const incrementCptServi=(req,res)=>{
    const idcommerce=req.params.idcommerce
    newManager.incrementeCptServi.getData(idcommerce).then(result=>{
        sendData(res,result)
    }).catch(err => console.error('connection error', err.stack))
}
const incrementCptQuitte=(req,res)=>{
    const idcommerce=req.params.idcommerce
    newManager.incrementeCptQuitte.getData(idcommerce).then(result=>{
        sendData(res,result)
    }).catch(err => console.error('connection error', err.stack))
}

module.exports = {
    commerceById,
    commerceConfigId,
    employeByIdCommerce,
    commerceStatistiques,
    horaireByIdCommerce,
    login,
    loginEmployee,
    commerceFiltre,
    filtre,
    commerceInscription,
    commerceConfig,
    employecreation,
    horaire,
    statistique,
    updateHoraire,
    updateCommerce,
    updateCommerceConfig,
    updateemployee,
    updateStatistique,
    deleteCommerce,
    creationcompteur,
    incrementCptServi,
    incrementCptQuitte

}