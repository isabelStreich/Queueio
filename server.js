'use strict'

const express =require('express')
// const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser')
const {response} = require('express')
const controler = require('./backend/controler/controler')
const controlerUpdate = require('./backend/controler/controleur_update')
const controler_post = require('./backend/controler/controler_post')
const dao = require('./backend/BD/dao')
const redis = require('redis');
const manager_post = require('./backend/manager/manager_post');
const controleur_update = require('./backend/controler/controleur_update');
let client =redis.createClient({port:6379,host:'127.0.0.1'});
const sha256= require('sha256')
//newBD
const newControler = require('./backend/controler/newControler')
const newManager = require('./backend/manager/newManager')


//TWILIO(VERIFICATION CEL NUMERO)
const { PhoneNumberContext } = require('twilio/lib/rest/lookups/v1/phoneNumber')
const config = require('./config')
const clientTwilio =require('twilio')(config.ACCOUNT_SID,config.AUTH_TOKEN)
const app=express()


const PORT=3000
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control')
    res.header('Access-Control-Allow-Credentials', 'false')
    next()
})
app.options('*', function (req,res) { res.sendStatus(200); });
//GET
app.get('/', (request, response) => {
    let pgJsonResult = null
        dao.connect()
            dao.query('SELECT * FROM public.commerce', [], (result) => {
            if (result.rowCount > 0) {
                pgJsonResult = result.rows
            } else {
                pgJsonResult = []
            }
            response.end(JSON.stringify(pgJsonResult,null,4))
            dao.disconnect()
        })
})

app.get('/commerceById/:commerce_id', newControler.commerceById) //obtenir commerce by id

app.get('/commerceConfigId/:commerce_id', newControler.commerceConfigId) //commerce congig by id commerce

app.get('/employeByIdCommerce/:id_commerce', newControler.employeByIdCommerce) //obtenir la liste employeByIdCommerce

app.get('/commerceStatistiques/:commerce_id', newControler.commerceStatistiques) //obtenir statistiques

app.get('/login/:courriel/:mot_passe', newControler.login)//Logincommerce

app.get('/loginEmployee/:courriel/:mot_passe', newControler.loginEmployee)//Loginemploye

app.get('/commerceavecfiltre/:filtre_id', newControler.commerceFiltre)//liste des commerces avec filtre

app.get('/filtre', newControler.filtre)//filtre 

app.get('/horaire/:commerce_id', newControler.horaireByIdCommerce)//horaire 


//POST

app.post('/commerceinscription/:nom/:adresse/:courriel/:mot_passe', newControler.commerceInscription)//inscription commerce

app.post('/commerceConfig/:filtre_id/:logo/:couleur/:nb_minutes_retard/:nb_clients_max/:temps_moyen_clients/:commerce_id', newControler.commerceConfig)//inscription commerce

app.post('/employecreation/:nom/:courriel/:mot_passe/:id_commerce', newControler.employecreation)//inscription employee

app.post('/horaire/:horaire_ouverture/:horaire_fermeture/:commerce_id', newControler.horaire)//inscription employee

app.post('/statistique/:nb_client_jour/:nb_client_mois/:nb_client_annee/:temp_moyen_attendre/:temp_moyen_client_commerce/:commerce_id', newControler.statistique)//inscription statistique

//PUT

app.put('/horaire/:horaire_ouverture/:horaire_fermeture/:commerce_id', newControler.updateHoraire)//horaires

app.put('/commerceupdate/:nom,:adresse,:courriel,:mot_passe,:id', newControler.updateCommerce)

app.put('/commerceConfig/:filtre_id/:logo/:couleur/:nb_minutes_retard/:nb_clients_max/:temps_moyen_clients/:commerce_id', newControler.updateCommerceConfig)

app.put('/updateemployee/:nom,:courriel,:mot_passe,:id_commerce', newControler.updateemployee)

app.put('/updateStatistique/:nb_client_jour,:nb_client_mois,:nb_client_annee,:temp_moyen_attendre,:temp_moyen_client_commerce,:commerce_id', newControler.updateStatistique)

//DELETE

app.delete('/deleteCommerce/:id', newControler.deleteCommerce)

// REDIS

//creation cpt et client
//Retourn position client.
app.get('/creationcompteur/cles_redis', newControler.creationcompteur)////creacion de cpt/ numeros de cada comercio

// affiche les info de les 2 prochaines clients et les info du chaque client: nom, telephone, position 
//Situation: le client dans la position 3 est servi maintenant et 
// le client de la position 4 y 5 sont appele pour savoir que se trouvent proche a etre servi
// [{"position":"4","tel":"5147398785","nom":"test"},{"position":"5","tel":"5147398785","nom":"test"}]
app.get('/redis/infoClient/:commerceId', function (request, response) {
    let pgJsonResult
    dao.connect()
    dao.query('SELECT * from public.cles_redis where id_commerce = $1', [request.params.commerceId], (result) => {
        if (result.rowCount > 0) {
            pgJsonResult = result.rows
            client.lrange(pgJsonResult[0].nom_commerce_list, 0, 1, function (err, reply) {
                client.hgetall(reply[0], function (err, info1) {
                    client.hgetall(reply[1], function (err, info2) {
                        let clientInfo = [info1, info2]
                        response.end(JSON.stringify(clientInfo))
                    })
                })
            })
        } else {
            pgJsonResult = []
            response.end('client non trouve')
        }
        dao.disconnect()
    })
})
//lista de positions clients dans le commerce. Ex: 1,2,3,......
app.get('/redis/listClient/:commerceId', function (request, response) {
    let pgJsonResult
    dao.connect()
    dao.query('SELECT * from public.cles_redis where id_commerce = $1', [request.params.commerceId], (result) => {
        if (result.rowCount > 0) {
            pgJsonResult = result.rows
            client.lrange(pgJsonResult[0].nom_commerce_list, 0, -1, function (err, reply) {
                let listClientPositions = []
                reply.forEach(element => {
                    if(request.params.commerceId < 10 ){
                        let position = element.slice(15, 30)
                        listClientPositions.push(position)
                    }else{
                        let position = element.slice(16, 30)
                        listClientPositions.push(position)
                    }             
                })
                response.end(JSON.stringify(listClientPositions))
            })
        } else {
            pgJsonResult = []
            response.end('client non trouve')
        }
        dao.disconnect()
    })
})
//Recuperation de total clients qui sont servies de la file d'attandre ex '10'
app.get('/redis/cptclientservi/:commerceId', function (request, response) {
    let pgJsonResult
    dao.connect()
    dao.query('SELECT cpt_client_servi from public.cles_redis where id_commerce = $1', [request.params.commerceId], (result) => {
        if (result.rowCount > 0) {
            pgJsonResult = result.rows
            client.get(pgJsonResult[0].cpt_client_servi, function (err, reply) {
                response.end(JSON.stringify(reply))
            })
        } else {
            pgJsonResult = []
        }
        dao.disconnect()
    })
})
//Recuperation de total clients qui sont sorties de la file d'attandre ex '8'
app.get('/redis/cptclientquitter/:commerceId', function (request, response) {
    let pgJsonResult
    dao.connect()
    dao.query('SELECT cpt_client_quitter from public.cles_redis where id_commerce = $1', [request.params.commerceId], (result) => {
        if (result.rowCount > 0) {
            pgJsonResult = result.rows
            client.get(pgJsonResult[0].cpt_client_quitter, function (err, reply) {
                response.end(JSON.stringify(reply))
            })
        } else {
            pgJsonResult = []
        }
        dao.disconnect()
    })
})
//****POST
//Incrementation de cpt client 
//Creation de client
//Ajout de client dans la liste
//return info client ex 'commerce3Client7'
app.post('/prendreNumero/:commerceId,:telephone,:nom', function (request, response) {
    let pgJsonResult
    dao.connect()
    dao.query('SELECT * from public.cles_redis where id_commerce = $1', [request.params.commerceId], (result) => {
        if (result.rowCount > 0) {
            pgJsonResult = result.rows
            client.incr(pgJsonResult[0].nom_cpt_client + '', function () {
            })
            client.get(pgJsonResult[0].nom_cpt_client + '', function (err, reply) {
                client.hmset(pgJsonResult[0].nom_client + reply + '', {
                    'position': '' + reply,
                    'tel': request.params.telephone + '',
                    'nom': request.params.nom + ''
                }, function () {
                })
                client.rpush(pgJsonResult[0].nom_commerce_list + '', pgJsonResult[0].nom_client + reply + '')
                response.end(JSON.stringify(pgJsonResult[0].nom_client + reply + ''))
            })
        } else {
            pgJsonResult = []
            response.end('client non trouve')
        }
        dao.disconnect()
    })
})
//*****PUT
app.get('/incrementCptServi/:idcommerce', newControler.incrementCptServi)//combien de client sont servi pour l'employe
app.get('/incrementCptQuitte/:idcommerce', newControler.incrementCptQuitte)//cpt combien de persons sont sortie de la file 
//*****DELETE

//client a decide de sortir de la file 
app.get('/deleteClientList/:idCommerce,:keyClient', function (request, response) {
    let pgJsonResult
    dao.connect()
    dao.query('SELECT * from public.cles_redis where id_commerce = $1', [request.params.idCommerce], (result) => {
        if (result.rowCount > 0) {
            pgJsonResult = result.rows
            client.lrem(pgJsonResult[0].nom_commerce_list, 1, request.params.keyClient, function () {
                response.end('client suprime!')
            })
        } else {
            pgJsonResult = []
            response.end('client non trouve')
        }
        dao.disconnect()
    })
})

app.get('/deleteClientServi/:idCommerce',function (request,response) {
    let pgJsonResult
    dao.connect()
    dao.query('SELECT * from cles_redis where id_commerce= $1',[request.params.idCommerce],(result)=>{
        if (result.rowCount>0){
            pgJsonResult=result.rows
            client.lpop(pgJsonResult[0].nom_commerce_list,function(){})
            let retour={'msg':'client delete'}
            response.end(JSON.stringify(retour))
        }
        dao.disconnect()
    })
})

//************* */
// TWILIO-VERIFICATION
//************* */
app.get('/envoyerVerification', (req,res)=>{
    if (req.query.phonenumber) {
        clientTwilio
            .verify
            .services(config.SERVICE_ID)
            .verifications
            .create({
                to: '+1' + req.query.phonenumber,
                channel: req.query.channel
            })
            // .then((data)=>{
            //     resp.status(200).send(data)
            // })
            .then(data => {
                res.status(200).send({
                    message: "Verification envoye!!",
                    phonenumber: req.query.phonenumber,
                    data
                })
            }) 
         } else {
            res.status(400).send({
                message: "Mauvais numéro de téléphone!!!",
                phonenumber: req.query.phonenumber,
                data
            })
         }

})

app.get('/recevoirVerification',(req,res)=>{
    if (req.query.phonenumber && (req.query.code).length === 4) {
        clientTwilio
        .verify
        .services(config.SERVICE_ID)
        .verificationChecks
        .create({
            to: '+1'+ req.query.phonenumber,
            code: req.query.code
        })
        // .then((data)=>{
        //     resp.status(200).send(data)
        // })
        .then(data => {
            if (data.status === "approved") {
                res.status(200).send({
                    message: "client verifiee!!",
                    data
                })
            }
        })
} else {
    res.status(400).send({
        message: "Mauvais numéro de telephone ou code !!!",
        phonenumber: req.query.phonenumber,
        data
    })
}

})

app.listen(PORT, () => {
    console.log('server listening on http://localhost:%s', PORT)
})