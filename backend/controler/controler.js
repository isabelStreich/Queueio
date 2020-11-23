const manager = require('../manager/manager')

const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'

const commercesss = (req, res) => {
    const comerceID = req.params.commerce_id
    manager.commerce.getData(comerceID).then(result => {
        sendData(res, result)
    })
}

module.exports = {
    commercesss
}