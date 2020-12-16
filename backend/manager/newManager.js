const {response} = require('express')
const dao = require('../BD/dao')
var redisNode = require('redis');
var client = redisNode.createClient(process.env.REDIS_URL);
const sha256= require('sha256')
// var Redis = require('ioredis');
// var redis = new Redis(process.env.REDIS_URL);

//GET

const commerceById = class CommerceById {
    static getData(comerceID) {
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
const commerceConfigId = class CommerceConfigId {
    static getData(comerceID) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * from public.commerce_config where commerce_id=$1', [comerceID], (result) => {
                if (result.rowCount > 0) {
                    pgJsonResult = result.rows
                } else {
                    pgJsonResult = []
                }
                resolve(pgJsonResult)
                dao.disconnect()
            })
        })
        // .catch(err => console.error('connection error', err.stack))
    }
}
const employeByIdCommerce = class EmployeByIdCommerce {
    static getData(comerceID) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM employee where id_commerce=$1', [comerceID], (result) => {
                if (result.rowCount > 0) {
                    pgJsonResult = result.rows
                } else {
                    pgJsonResult = []
                }
                resolve(pgJsonResult)
                dao.disconnect()
            })
        })
        // .catch(err => console.error('connection error', err.stack))
    }
}
const commerceStatistiques = class CommerceStatistiques {
    static getData(comerceStatique) {
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
const horaireByIdCommerce = class HoraireByIdCommerce {
    static getData(comerceID) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM public.horaire WHERE commerce_id = $1', [comerceID], (result) => {
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
const login = class Login {
    static getData(courriel, mot_passe) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM public.commerce WHERE courriel = $1 AND mot_passe =$2', [courriel, sha256(mot_passe)], (result) => {
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
const loginEmployee = class LoginEmployee {
    static getData(courriel, mot_passe) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * FROM public.employee WHERE courriel = $1 AND mot_passe =$2', [courriel, sha256(mot_passe)], (result) => {
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
const filtre = class Filtre {
    static getData() {
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

//POST

const commerceInscription = class CommerceInscription {
    static getData (nom,adresse,courriel,motPasse) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('INSERT INTO public.commerce(nom,adresse,courriel,mot_passe) VALUES ($1, $2, $3,$4)', [nom,adresse,courriel,sha256(motPasse)], (result) => {
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
const commerceConfig = class CommerceConfig {
       static getData (filtreId,logo,couleur,nbMinutesRetard,nbClientsMax,tempsMoyenClients,nomCommerceList, nomClient, nomCptClient, cptClientServi,cptClientQuitter,comerceID) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('INSERT INTO public.commerce_config(filtre_id,logo,couleur,nb_minutes_retard,nb_clients_max,temps_moyen_clients,commerce_id) VALUES ($1, $2, $3,$4,$5,$6,$7)', [filtreId,logo,couleur,nbMinutesRetard,nbClientsMax,tempsMoyenClients,comerceID], (result) => {
                if (result.rowCount > 0) {
                    dao.query('INSERT INTO cles_redis(nom_commerce_list, nom_client, nom_cpt_client, cpt_client_servi,cpt_client_quitter,id_commerce) VALUES($1, $2, $3, $4,$5,$6)', [nomCommerceList, nomClient, nomCptClient, cptClientServi,cptClientQuitter,comerceID], (result1) => {
                        if (result1.rowCount > 0) {
                            pgJsonResult = result1.rows
                        } else {
                            pgJsonResult = []
                        }
                        resolve(pgJsonResult)
                        dao.disconnect()
                    })
                } else {
                    pgJsonResult = []
                    resolve(pgJsonResult)
                    dao.disconnect()
                }
              
            })
        })
    }
}
const employecreation = class Employecreation {
    static getData (nom,courriel,mot_passe,id_commerce) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('INSERT INTO public.employee(nom,courriel,mot_passe,id_commerce) VALUES ($1, $2, $3,$4)', [nom,courriel,sha256(mot_passe),id_commerce], (result) => {
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
const horaire = class Horaire {
    
    static getData (horaireOuverture,horaireFermeture,comerceID) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('INSERT INTO public.horaire(horaire_ouverture,horaire_fermeture,commerce_id) VALUES ($1, $2, $3)', [horaireOuverture,horaireFermeture,comerceID], (result) => {
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
const statistique = class Statistique {
    
    static getData (nbClientJour,nbClientMois,nbClientAnnee,tempMoyenAttendre,tempMoyenClientCommerce,commerceID) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('INSERT INTO public.statistique(nb_client_jour,nb_client_mois,nb_client_annee,temp_moyen_attendre,temp_moyen_client_commerce,commerce_id) VALUES ($1, $2, $3, $4,$5,$6)', [nbClientJour,nbClientMois,nbClientAnnee,tempMoyenAttendre,tempMoyenClientCommerce,commerceID], (result) => {
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

//PUT

const updateHoraire = class UpdateHoraire {
    
    static getData (horaireOuverture,horaireFermeture,comerceID) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE horaire set horaire_ouverture = $1 ,horaire_fermeture =$2,commerce_id=$3', [horaireOuverture,horaireFermeture,comerceID], (result) => {
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
            dao.query('UPDATE commerce set nom=$1, adresse=$2, courriel=$3,mot_passe=$4 where id= $5', [nom,adress,courriel, sha256(mot_passe),id], (result) => {
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
const updateCommerceConfig=class UpdateCommerceConfig{
    	
// nb_clients_max
// nbClientsMax
    static getData(filtreId,logo,couleur,nbMinutesRetard,nbClientsMax,tempsMoyenClients,commerceId){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE public.commerce_config set filtre_id=$1, logo=$2, couleur=$3,nb_minutes_retard=$4, nb_clients_max =$5, temps_moyen_clients =$6 where commerce_id =$7', [filtreId,logo,couleur,nbMinutesRetard,nbClientsMax,tempsMoyenClients,commerceId], (result) => {
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
const updateemployee=class Updateemployee{
    static getData(nom,courriel,motPasse,id){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE public.employee set nom=$1, courriel=$2, mot_passe=$3 where id_commerce= $4', [nom,courriel, sha256(motPasse),id], (result) => {
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
const updateStatistique=class UpdateStatistique{
    static getData(nbClientJour,nbClientMois,nbClientAnnee,tempMoyenAttendre,tempMoyenClientCommerce,id){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('UPDATE public.statistique set nb_client_jour=$1, nb_client_mois=$2, nb_client_annee=$3, temp_moyen_attendre=$4, temp_moyen_client_commerce =$5 where commerce_id= $6', [nbClientJour,nbClientMois,nbClientAnnee,tempMoyenAttendre,tempMoyenClientCommerce,id], (result) => {
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


//DELETE

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

//REDIS

const creationcompteur = class CreationCompteur {
    static getData () {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * From public.cles_redis', [], (result) => {
                if (result.rowCount > 0) {
                    pgJsonResult = result.rows
                } else {
                    pgJsonResult = []
                }
                dao.disconnect()
                client.set(pgJsonResult[0].nom_cpt_client+'', 0, function(){})
                client.get(pgJsonResult[0].nom_cpt_client+'', function(err,reply){
                    client.hmset(pgJsonResult[0].nom_client+ ''+reply,{'potition':''+reply},function(){})
                    client.hgetall(pgJsonResult[0].nom_client+ ''+reply,function(err,rep){
                        // response.end(JSON.stringify(rep))
                    })
                })
            })
            resolve(pgJsonResult)
        })
    }
}

const incrementeCptServi= class IncrementecptServi{
    static getData(idcommerce){
        let pgJsonResult=null
        return new Promise(resolve=>{
            dao.connect()
            dao.query('SELECT * from cles_redis where id_commerce = $1',[idcommerce],(result)=>{
                if(result.rowCount>0){
                    pgJsonResult = result.rows
                    client.incr(pgJsonResult[0].cpt_client_servi+'',function(){})
                }else{
                    pgJsonResult=[]
                }
                resolve(pgJsonResult)
                dao.disconnect()
            })
        })
    }
}
const incrementeCptQuitte= class IncrementecptQuitte{
    static getData(idcommerce){
        let pgJsonResult=null
        return new Promise(resolve=>{
            dao.connect()
            dao.query('SELECT * from cles_redis where id_commerce = $1',[idcommerce],(result)=>{
                if(result.rowCount>0){
                    pgJsonResult = result.rows
                    client.incr(pgJsonResult[0].cpt_client_quitter+'',function(){})
                }else{
                    pgJsonResult=[]
                }
                resolve(pgJsonResult)
                dao.disconnect()
            })
        })
    }
}
module.exports = {
    commerceById,
    commerceConfigId,
    commerceConfig,
    employeByIdCommerce,
    commerceStatistiques,
    horaireByIdCommerce,
    login,
    statistique,
    loginEmployee,
    commerceFiltre,
    filtre,
    commerceInscription,
    employecreation,
    horaire,
    updateHoraire,
    updateCommerce,
    updateCommerceConfig,
    updateemployee,
    updateStatistique,
    deleteCommerce,
    creationcompteur,
    incrementeCptServi,
    incrementeCptQuitte
  
}
