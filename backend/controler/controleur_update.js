const manager = require('../manager/manager_update')

const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'

//test
const updateCouleur = (req, res) => {
    manager.updateCouleur.getData().then(result => {
        sendData(res, result)
    })
}



module.exports = {
    updateCouleur
}