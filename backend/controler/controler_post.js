const manager = require('../manager/manager_post')

const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'


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
    servicesCreation
}