const dao = require('../BD/dao')
//select by id
const commerce = class commerceSele {
    static getData (comerceID) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM commerce WHERE id = $1', [comerceID], (result) => {
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
            dao.query('SELECT * FROM commerce', [], (result) => {
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
            dao.query('SELECT * FROM commerce WHERE filtre_id = $1', [comerceFiltreID], (result) => {
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
            dao.query('select *from statistiques WHERE id = $1', [comerceStatique], (result) => {
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

module.exports = {
    commerce,
    commercesTous,
    commerceFiltre,
    commerceStatistiques
}