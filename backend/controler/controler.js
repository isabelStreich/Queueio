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

// const login = (req, res) => {
//     const mail = req.params.courriel
//     const pwd = req.params.mot_passe
//     manager.loginUser.getData(mail,pwd).then(result => {
//         sendData(res, result)
//     })
// }
// const user=(req,res)=>{
//     const role=req.params.roleid
//     manager.user.getData(role).then(result=>{
//         sendData(res,result)
//     })
// }

module.exports = {
    commercesss,
    commercesTous,
    commerceStat,
    commerceAvecFiltre,
    roleEmployee
    // user

}