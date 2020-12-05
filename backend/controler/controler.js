const manager = require('../manager/manager')

const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'

const commercesss = (req, res) => {
    const comerceID = req.params.commerce_id
    manager.commerce.getData(comerceID).then(result => {
        sendData(res, result)
    })
}
const commercesTous = (req, res) => {
    
    manager.commercesTous.getData().then(result => {
        sendData(res, result)
    })
}

const commerceAvecFiltre = (req, res) => {
    const comerceFiltreID = req.params.filtre_id
    manager.commerceFiltre.getData(comerceFiltreID).then(result => {
        sendData(res, result)
    })
}

const commerceStat = (req, res) => {
    const comerceStatique = req.params.commerce_id
    manager.commerceStatistiques.getData(comerceStatique).then(result => {
        sendData(res, result)
        
    })
}
const roleEmployee = (req, res) => {
    const employeRole2 = req.params.role_id
    manager.userRole.getData(employeRole2).then(result => {
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
const couleur = (req, res) => {
    
    manager.couleur.getData().then(result => {
        sendData(res, result)
    })
}
const filtre = (req, res) => {
    
    manager.filtre.getData().then(result => {
        sendData(res, result)
    })
}


// const clesRedis = (req, res) => {
    
//     manager.clesRedis.getData().then(result => {
//         sendData(res, result)
//     })
// }
// ********************************************************************
//aa corriger
// const infoClient=(req,res)=>{
//     const idCommerce=req.params.commerceId
//     manager.infoClient.getData(idCommerce).then(result=>{
//         sendData(res,result)
//     })
// }



module.exports = {
    commercesss,
    commercesTous,
    commerceStat,
    commerceAvecFiltre,
    roleEmployee,
    login,
    couleur,
    filtre
    // infoClient
    // clesRedis
    // user

}