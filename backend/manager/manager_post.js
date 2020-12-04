const dao = require('../BD/dao')
const redis = require('redis');
let client =redis.createClient({port:6379,host:'127.0.0.1'});

//(creation commerce//Formulaire d'Inscription)
// INSERT INTO public.commerce(nom,adresse,courriel,mot_passe)
// VALUES ('metro', '123 Victoria H3W 1P5', 'metro@mail.com','abc123');
const commerceInscription = class CommerceInscription {
    static getData (nom,adresse,courriel,mot_passe) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('INSERT INTO public.commerce(nom,adresse,courriel,mot_passe) VALUES ($1, $2, $3,$4)', [nom,adresse,courriel,mot_passe], (result) => {
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
const commerceConfiguration = class CommerceConfiguration {
    // nom_commerce_list, nom_client, nom_cpt_client, cpt_client_servi,cpt_client_quitter,id_commerce
    // nomCommerceList, nomClient, nomCptClient, cptClientServi,cptClientQuitter,idCommerce
    // ,nomCommerceList, nomClient, nomCptClient, cptClientServi,cptClientQuitter
    static getData (filtreId,statistiqueId,logo,couleurId,horaireId,nbMinutesRetard,nbClientsMax,tempsMoyenClients,employeeId,serviceId,commerceId,nomCommerceList, nomClient, nomCptClient, cptClientServi,cptClientQuitter) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('INSERT INTO public.commerce_config(filtre_id,statistique_id,logo,couleur_id,horaire_id,nb_minutes_retard,nb_clients_max,temps_moyen_clients,employee_id,service_id,commerce_id) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)' ,[filtreId,statistiqueId,logo,couleurId,horaireId,nbMinutesRetard,nbClientsMax,tempsMoyenClients,employeeId,serviceId,commerceId], (result1) => {
                if (result1.rowCount > 0) {
                    dao.query('INSERT INTO cles_redis(nom_commerce_list, nom_client, nom_cpt_client, cpt_client_servi,cpt_client_quitter,id_commerce) VALUES($1, $2, $3, $4,$5,$6)', [nomCommerceList, nomClient, nomCptClient, cptClientServi,cptClientQuitter,commerceId], (result2) => {
                        if (result2.rowCount > 0) {
                            pgJsonResult = result2.rows
                        } else {
                            pgJsonResult = []
                        }
                        resolve(pgJsonResult)
                        dao.disconnect()
                    })
                } else {
                    pgJsonResult = { erreur: '409' }
                    resolve(pgJsonResult)
                    dao.disconnect()
                }
            })
            // dao.query('INSERT INTO public.commerce_config(filtre_id,statistique_id,logo,couleur_id,horaire_id,nb_minutes_retard,nb_clients_max,temps_moyen_clients,employee_id,service_id,commerce_id) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)', [filtreId,statistiqueId,logo,couleurId,horaireId,nbMinutesRetard,nbClientsMax,tempsMoyenClients,employeeId,serviceId,commerceId], (result) => {
            //     if (result.rowCount > 0) {
            //         pgJsonResult = result.rows
            //     } else {
            //         pgJsonResult = []
            //     }
            //     resolve(pgJsonResult)
            //     dao.disconnect()
            // })
            // client.set(nomCptClient+'',0,function(){})
            // client.set(cptClientServi+'',0,function(){})
            // client.set(cptClientQuitter+'',0,function(){})
        })
    }
}


// const commerceInscription = class CommerceInscription {
//     static getData (nom,adresse,courriel,mot_passe) {
//         let pgJsonResult = null
//         return new Promise(resolve => {
//             dao.connect()
//             dao.query('INSERT INTO public.commerce(nom,adresse,courriel,mot_passe) VALUES ($1, $2, $3,$4)', [nom,adresse,courriel,mot_passe], (result) => {
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
// (creation employee)
//INSERT INTO public.employee(nom,courriel,mot_passe,id_commerce) VALUES ('mon employee', 'employe@mail.com', 'qwerty',3)
const employecreation = class Employecreation {
    static getData (nom,courriel,mot_passe,id_commerce) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('INSERT INTO public.employee(nom,courriel,mot_passe,id_commerce) VALUES ($1, $2, $3,$4)', [nom,courriel,mot_passe,id_commerce], (result) => {
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
// (creation service)
//INSERT INTO public.services (nom_service,duree_aprox) VALUES ('service pour hommes','10')

const servicesCreation = class ServicesCreation1 {
    static getData (nomService,dureeAprox) {
        let pgJsonResult = null
        return new Promise(resolve => {
            dao.connect()
            dao.query('INSERT INTO public.services (nom_service,duree_aprox) VALUES ($1, $2)', [nomService,dureeAprox], (result) => {
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


// const commerceInscription = class CommerceInscription {
//     static addData (trackObject) {
//         let pgJsonResult = null
//         const values = [trackObject.playlist_id, trackObject.title, trackObject.uri, trackObject.master_id]

//         return new Promise(resolve => {
//             dao.connect()
//             dao.query('SELECT * FROM playlist WHERE id = $1', [trackObject.playlist_id], (result1) => {
//                 if (result1.rowCount > 0) {
//                     dao.query('INSERT INTO track(playlist_id, title, uri, master_id) VALUES($1, $2, $3, $4)', values, (result2) => {
//                         if (result2.rowCount > 0) {
//                             pgJsonResult = { operation: '200' }
//                         } else {
//                             pgJsonResult = { operation: '505' }
//                         }
//                         resolve(pgJsonResult)
//                         dao.disconnect()
//                     })
//                 } else {
//                     pgJsonResult = { erreur: '409' }
//                     resolve(pgJsonResult)
//                     dao.disconnect()
//                 }
//             })
//         })
//     }
// }
//test
const creationCompteur1 = class CreationCompteur {
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
                // response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_JSON })
                // response.end(JSON.stringify(pgJsonResult))
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

const prendreNumero = class PrendreNumero{
    static getData(commerceId,telephone,nom){
        let pgJsonResult=null
        return new Promise(resolve => {
            dao.connect()
            dao.query('SELECT * from cles_redis where id_commerce = $1', [commerceId], (result) => {
                if (result.rowCount > 0) {
                    pgJsonResult = result.rows
                    client.incr(pgJsonResult[0].nom_cpt_client+'',function(){})
                    client.get(pgJsonResult[0].nom_cpt_client+'',function(err,reply){
                        client.hmset(pgJsonResult[0].nom_client+reply+'',{'position': ''+reply ,'tel':telephone+'','nom':nom+''},function(){})
                        client.rpush(pgJsonResult[0].nom_commerce_list+'',pgJsonResult[0].nom_client+reply+'')
                    })
                    resolve(pgJsonResult)
                } else {
                    pgJsonResult = []
                    resolve(pgJsonResult)
                }
                dao.disconnect()
            })
        })
    }
}

module.exports = {
    commerceInscription,
    employecreation,
    servicesCreation,
    commerceConfiguration,
    creationCompteur1,
    prendreNumero
}