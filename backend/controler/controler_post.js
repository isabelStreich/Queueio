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

module.exports = {
    commerceInscription,
    login
}