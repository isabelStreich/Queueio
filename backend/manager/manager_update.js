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
    static getData(ouvertureSemaine,fermetureSemaine,ouvertureWeekend,fermetureWeekend,id){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE horaire set ouverture_semaine=$1, fermeture_semaine=$2, ouverture_weekend=$3,fermeture_weekend=$4 where id= $5', [ouvertureSemaine,fermetureSemaine,ouvertureWeekend,fermetureWeekend,id], (result) => {
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
const updateCommerce=class UpdateCommerce{
    static getData(nom,adress,courriel,mot_passe,id){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE commerce set nom=$1, adresse=$2, courriel=$3,mot_passe=$4 where id= $5', [nom,adress,courriel,mot_passe,id], (result) => {
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
    updateCouleur,
    updateHoraire,
    updateCommerce
}