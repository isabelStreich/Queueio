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
//filtre des commerces
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
//statistiques segun id
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
//LOGIN:(session de login)
const login = class Login {
    static getData (courriel,mot_passe) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM public.commerce WHERE courriel = $1 AND mot_passe =$2', [courriel,mot_passe], (result) => {
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
 //get  tous les couleurs 
const couleur = class Couleur {
    static getData () {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM public.couleur', [], (result) => {
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
//get all filtre
const filtre = class Filtre {
    static getData () {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM public.filtre', [], (result) => {
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
//get all filtre
// const clesRedis = class ClesRedis {
//     static getData () {
//         let pgJsonResult = null
//         return new Promise(resolve => {
//             dao.connect()
//             dao.query('SELECT * From public.cles_redis', [], (result) => {
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
    commerceStatistiques,
    login,
    couleur,
    filtre
    // clesRedis
//    user
}