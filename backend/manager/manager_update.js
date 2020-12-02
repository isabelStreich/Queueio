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

// UPDATE public.commerce_config set filtre_id=1, logo='monimage.img', couleur_id='2',nb_minutes_retard='1', temps_moyen_clients ='15' where id=1
const updateCommerceConfig=class UpdateCommerceConfig{
    static getData(filtreId,logo,couleurId,nbMinutesRetard,tempsMoyenClients,commerceId,id){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE public.commerce_config set filtre_id=$1, logo=$2, couleur_id=$3,nb_minutes_retard=$4, temps_moyen_clients =$5,commerce_id =$6 where id= $7', [filtreId,logo,couleurId,nbMinutesRetard,tempsMoyenClients,commerceId,id], (result) => {
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

// Updateemployee
// UPDATE public.employee set nom='seul employe', courriel='seulEmployee@mail.com', mot_passe='qwerty' where id= 4
const updateemployee=class Updateemployee{
    static getData(nom,courriel,motPasse,id){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE public.employee set nom=$1, courriel=$2, mot_passe=$3 where id= $4', [nom,courriel,motPasse,id], (result) => {
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
// 
//UPDATE public.services set nom_service='ns/nc', duree_aprox='0' where id= 1
const updateService=class UpdateService{
    static getData(nomService,dureeAprox,id){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE public.services set nom_service=$1, duree_aprox=$2 where id= $3', [nomService,dureeAprox,id], (result) => {
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

// UPDATE public.statistique set nb_client_jour=$1, nb_client_mois=$2, nb_client_annee=$3, temp_moyen_attendre=$4, temp_moyen_client_commerce =$5 where id= $6
// UPDATE public.statistique set nbClientJour='10', nb_client_mois='30', ='365', temp_moyen_attendre='10', temp_moyen_client_commerce ='40' where id='2'
const updateStatistique=class UpdateStatistique{
    static getData(nbClientJour,nbClientMois,nbClientAnnee,tempMoyenAttendre,tempMoyenClientCommerce,id){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE public.statistique set nb_client_jour=$1, nb_client_mois=$2, nb_client_annee=$3, temp_moyen_attendre=$4, temp_moyen_client_commerce =$5 where id= $6', [nbClientJour,nbClientMois,nbClientAnnee,tempMoyenAttendre,tempMoyenClientCommerce,id], (result) => {
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
// ******************************************************
// ******************************************************
// ******************************************************
// ******************************************************
// ******************************************************
// ******************************************************
// DELETE FROM links
// WHERE id = 8
const deleteCommerce=class DeleteCommerce{
    static getData(id){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('DELETE FROM commerce  where id= $1', [id], (result) => {
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
    updateCommerce,
    updateCommerceConfig,
    updateemployee,
    updateService,
    updateStatistique,
    deleteCommerce

}