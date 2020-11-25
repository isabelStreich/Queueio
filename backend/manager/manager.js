const dao = require('../BD/dao')
//select by id
const commerce = class commerceSele {
    static getData (comerceID) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM public.commerce WHERE id = $1', [comerceID], (result) => {
                if (result.rowCount > 0) {
                    pgJsonResult = result.rows
                } else {
                    pgJsonResult = []
                }
                resolve(pgJsonResult)
                dao.disconnect()
            })
        })
    }
}
//get all
const commercesTous = class CommercesTous {
    static getData () {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM public.commerce', [], (result) => {
                if (result.rowCount > 0) {
                    pgJsonResult = result.rows
                } else {
                    pgJsonResult = []
                }
                resolve(pgJsonResult)
                dao.disconnect()
            })
        })
    }
}

//select *from commerce WHERE filtre_id =1
const commerceFiltre = class CommerceFiltre {
    static getData(comerceFiltreID) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM public.commerce_config WHERE filtre_id = $1', [comerceFiltreID], (result) => {
                if (result.rowCount > 0) {
                    pgJsonResult = result.rows
                } else {
                    pgJsonResult = []
                }
                resolve(pgJsonResult)
                dao.disconnect()
            })
        })
    }
}
const commerceStatistiques = class CommerceStatistiques {
    static getData (comerceStatique) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM statistique WHERE id = $1', [comerceStatique], (result) => {
                if (result.rowCount > 0) {
                    pgJsonResult = result.rows
                } else {
                    pgJsonResult = []
                }
                resolve(pgJsonResult)
                dao.disconnect()
            })
        })
    }
}

 
// const user=class UserFiltre{
//     static getData(userFiltre){
//         let pgJsonResult = null
//         return new Promise(resolve => {
//             dao.connect()
//             dao.query('SELECT * FROM public.user WHERE role_id = $1', [userFiltre], (result) => {
//                 if (result.rowCount > 0) {
//                     pgJsonResult = result.rows
//                 } else {
//                     pgJsonResult = []
//                 }
//                 resolve(pgJsonResult)
//                 dao.disconnect()
//             })
//         })
//     }
// }

// // SELECT * FROM public."user"
// // where role_id =2
// const userRole = class UserRole {
//     static getData (employeRole2) {
//         let pgJsonResult = null
//         return new Promise(resolve => {
//             dao.connect()
//             dao.query('SELECT * FROM user WHERE role_id = $1', [employeRole2], (result) => {
//                 if (result.rowCount > 0) {
//                     pgJsonResult = result.rows
//                 } else {
//                     pgJsonResult = []
//                 }
//                 resolve(pgJsonResult)
//                 dao.disconnect()
//             })
//         })
//     }
// }

// // SELECT 	* FROM 	public.user WHERE courriel = 'employee@gmail.com' AND mot_passe = 'abc123'
// const loginUser = class LoginUser {
//     static getData (mail,pwd) {
//         let pgJsonResult = null
//         return new Promise(resolve => {
//             dao.connect()
//             dao.query('SELECT * FROM user WHERE courriel = $1 AND mot_passe =$2', [mail,pwd], (result) => {
//                 if (result.rowCount > 0) {
//                     pgJsonResult = result.rows
//                 } else {
//                     pgJsonResult = []
//                 }
//                 resolve(pgJsonResult)
//                 dao.disconnect()
//             })
//         })
//     }
// }

module.exports = {
    commerce,
    commercesTous,
    commerceFiltre,
    commerceStatistiques
//    user
}