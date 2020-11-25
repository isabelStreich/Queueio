const dao = require('../BD/dao')

//test
const updateCouleur=class UpdateCouleur{
    static getData () {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE couleur set nom_couleur=$1 where id= $2', ['banana','1'], (result) => {
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

const updateHoraire=class UpdateHoraire{
    static getData(){
        let pgJsonResult=null
        
    }
}

module.exports = {
    updateCouleur
}