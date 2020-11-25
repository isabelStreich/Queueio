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

module.exports = {
    updateCouleur,
    updateOuverture,
    updateCommerce
}