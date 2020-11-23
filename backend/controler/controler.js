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

// const commerceAvecFiltre = (req, res) => {
//     const comerceFiltreID = req.params.filtre_id
//     manager.commerceFiltre.getData(comerceFiltreID).then(result => {
//         sendData(res, result)
//     })
// }

const commerceStat = (req, res) => {
    const comerceStatique = req.params.commerce_id
    manager.commerceStatistiques.getData(comerceStatique).then(result => {
        sendData(res, result)
    })
}

module.exports = {
    commercesss,
    commercesTous,
    commerceStat
    // commerceAvecFiltre

}