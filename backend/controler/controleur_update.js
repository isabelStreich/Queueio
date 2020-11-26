const manager_update = require('../manager/manager_update')
const manager = require('../manager/manager_update')

const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'

//test
const updateCouleur = (req, res) => {
    manager.updateCouleur.getData().then(result => {
        sendData(res, result)
    })
}
const updateOuverture=(req,res)=>{
    const ouvertureSemaine= req.params.ouvertureSem
    const fermetureSemaine= req.params.fermetureSem
    const ouvertureFinSemaine= req.params.ouvertureFinSem
    const fermetureFinSemaine= req.params.fermetureFinSem
    const idHoraire= req.params.id
    manager_update.updateHoraire.getData(ouvertureSemaine,fermetureSemaine,ouvertureFinSemaine,fermetureFinSemaine,idHoraire).then(result=>{
        sendData(res,result)
    })
}

const updateCommerce=(req,res)=>{
    const nom=req.params.nom
    const adress=req.params.adress
    const courriel=req.params.courriel
    const motPasse=req.params.mot_passe
    const id=req.params.id
    manager_update.updateCommerce.getData(nom,adress,courriel,motPasse,id).then(result=>{
        sendData(res,result)
    })
}
const updateCommerceConfig=(req,res)=>{
   
    const filtreId=req.params.filtre_id
    const logo=req.params.logo
    const couleurId=req.params.couleur_id
    const nbMinutesRetard=req.params.nb_minutes_retard
    const tempsMoyenClients=req.params.temps_moyen_clients
    const id=req.params.id
    manager_update.updateCommerceConfig.getData(filtreId,logo,couleurId,nbMinutesRetard,tempsMoyenClients,id).then(result=>{
        sendData(res,result)
    })
}
const updateemployee=(req,res)=>{
    const nom=req.params.nom
    const courriel=req.params.courriel
    const motPasse=req.params.mot_passe
    const id=req.params.id
    manager_update.updateemployee.getData(nom,courriel,motPasse,id).then(result=>{
        sendData(res,result)
    })
}
const updateService=(req,res)=>{
    const nomService=req.params.nom_service
    const dureeAprox=req.params.duree_aprox
    const id=req.params.id
    manager_update.updateService.getData(nomService,dureeAprox,id).then(result=>{
        sendData(res,result)
    })
}

module.exports = {
    updateCouleur,
    updateOuverture,
    updateCommerce,
    updateCommerceConfig,
    updateemployee,
    updateService
}