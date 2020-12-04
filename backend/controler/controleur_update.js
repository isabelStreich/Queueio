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
    const commerceId=req.params.commerce_id
    const id=req.params.id
    manager_update.updateCommerceConfig.getData(filtreId,logo,couleurId,nbMinutesRetard,tempsMoyenClients,commerceId,id).then(result=>{
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
const updateStatistique=(req,res)=>{
    const nbClientJour=req.params.nb_client_jour
    const nbClientMois=req.params.nb_client_mois
    const nbClientAnnee=req.params.nb_client_annee
    const tempMoyenAttendre=req.params.temp_moyen_attendre
    const tempMoyenClientCommerce=req.params.temp_moyen_client_commerce
    const id=req.params.id
    manager_update.updateStatistique.getData(nbClientJour,nbClientMois,nbClientAnnee,tempMoyenAttendre,tempMoyenClientCommerce,id).then(result=>{
        sendData(res,result)
    })
}
// ******************************************************
// ******************************************************
// ******************************************************
// ******************************************************
// ******************************************************
// ******************************************************
const deleteCommerce=(req,res)=>{
    
    const id=req.params.id
    manager_update.deleteCommerce.getData(id).then(result=>{
        sendData(res,result)
    })
}

const incrementCptServi=(req,res)=>{
    const idcommerce=req.params.idcommerce
    manager_update.incrementeCptServi.getData(idcommerce).then(result=>{
        sendData(res,result)
    })
}
const incrementCptQuitte=(req,res)=>{
    const idcommerce=req.params.idcommerce
    manager_update.incrementeCptQuitte.getData(idcommerce).then(result=>{
        sendData(res,result)
    })
}

module.exports = {
    updateCouleur,
    updateOuverture,
    updateCommerce,
    updateCommerceConfig,
    updateemployee,
    updateService,
    updateStatistique,
    deleteCommerce,
    incrementCptServi,
    incrementCptQuitte
}