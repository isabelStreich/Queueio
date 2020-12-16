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

//GET
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Redis, and Postgres API' })
  })
app.get('/commercetest/:commerce_id',controler.commercesss) //obtenir un commerce
app.get('/commercetest/filtreId/:filtre_id',controler.commerceAvecFiltre)
app.get('/commercetest',controler.commercesTous) //obtenir la liste de tous les commerces
app.get('/commercetest/stats/:commerce_id',controler.commerceStat) //obtenir statistiques
app.get('/test/login/:courriel/:mot_passe',controler.login)//Login
app.get('/test/couleur',controler.couleur)//Login
app.get('/test/filtre',controler.filtre)//Login
// app.get('/queueio/cles_redis',controler.clesRedis)//cles_redis


// app.get('/commercetest/user/:role_id',controler.roleEmployee)//obtenir info employe-doesn't work
// app.get('/commercetest/login/:courriel/:mot_passe',controler.login) //login

//POST
// app.post('/commercetest/creation_commerce', tracksControleur.ajout)//creation commerce//Formulaire d'Inscription
app.post('/test/:nom/:adresse/:courriel/:mot_passe',controler_post.commerceInscription)//inscription commerce
app.post('/test/employecreation/:nom/:courriel/:mot_passe/:id_commerce',controler_post.employecreation)//inscription employee
app.post('/test/servicesCreation/:nom_service/:duree_aprox',controler_post.servicesCreation)//inscription
app.post('/test/commerceConfig/:filtre_id,:statistique_id,:logo,:couleur_id,:horaire_id,:nb_minutes_retard,:nb_clients_max,:temps_moyen_clients,:employee_id,:service_id,:commerce_id',controler_post.commerceConfiguration)
// app.post('/test/login/:courriel/:mot_passe',controler_post.login)//Log

//PUT
app.put('/commercetest/updateC',controlerUpdate.updateCouleur)


// app.get('/test/:roleid',controler.user)
app.put('/update/horaire/:ouvertureSem,:fermetureSem,:ouvertureFinSem,:fermetureFinSem,:id',controlerUpdate.updateOuverture)//horaires
app.put('/update/commerce/:nom,:adress,:courriel,:mot_passe,:id',controlerUpdate.updateCommerce)
app.put('/update/updateCommerceConfig/:filtre_id,:logo,:couleur_id,:nb_minutes_retard,:temps_moyen_clients,:commerce_id,:id',controlerUpdate.updateCommerceConfig)
app.put('/update/updateemployee/:nom,:courriel,:mot_passe,:id',controlerUpdate.updateemployee)
app.put('/update/updateService/:nom_service,:duree_aprox,:id',controlerUpdate.updateService)
app.put('/update/updateStatistique/:nb_client_jour,:nb_client_mois,:nb_client_annee,:temp_moyen_attendre,:temp_moyen_client_commerce,:id',controlerUpdate.updateStatistique)
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



//************* */
// REDIS
//************* */
//creation cpt et client
//Retourn position client.
app.get('/queueio/cles_redis',controler_post.creationcompteur)
app.get('/queueio/testredis',function(request,response){
    
    response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_JSON })
    client.get('nb',function(err,reply){
        console.log(reply)
        const rep={'nb':reply}
        response.end(JSON.stringify(rep))
    })
    
})
app.get('/testredis3',function(request,response){
    
    response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_JSON })
    client.hgetall('client7',function(err,reply){
        console.log(reply);
        const rep=reply
        response.end(JSON.stringify(rep))
    });
})

app.get('/redis/infoClient/:commerceId',function(request,response){
    let pgJsonResult
    dao.connect()
    dao.query('SELECT * from public.cles_redis where id_commerce = $1',[request.params.commerceId],(result)=>{
        if (result.rowCount>0){
            pgJsonResult= result.rows
            client.lrange(pgJsonResult[0].nom_commerce_list,0,1,function(err,reply){
                client.hgetall(reply[0],function(err,info1){
                    client.hgetall(reply[1],function(err,info2){
                        let clientInfo=[info1,info2]
                        response.end(JSON.stringify(clientInfo))
                    })
                })
            })
        }else{
            pgJsonResult =[]
            response.end('client non trouve')
        }
        dao.disconnect
    })
})

app.get('/redis/listClient/:commerceId',function(request,response){
    let pgJsonResult
    dao.connect()
    dao.query('SELECT * from public.cles_redis where id_commerce = $1',[request.params.commerceId],(result)=>{
        if (result.rowCount>0){
            pgJsonResult= result.rows
            client.lrange(pgJsonResult[0].nom_commerce_list,0,-1,function(err,reply){
            let listClientPositions=[]
            reply.forEach(element => {
                let position=element.slice(15,30)
                listClientPositions.push(position)
            })
            response.end(JSON.stringify(listClientPositions))
            })
        }else{
            pgJsonResult =[]
            response.end('client non trouve')
        }
        dao.disconnect
    })
})

app.get('/redis/cptclientservi/:commerceId',function(request,response){
    let pgJsonResult
    dao.connect()
    dao.query('SELECT cpt_client_servi from public.cles_redis where id_commerce = $1',[request.params.commerceId],(result)=>{
        if (result.rowCount>0){
            pgJsonResult= result.rows
            client.get(pgJsonResult[0].cpt_client_servi,function(err,reply){
                response.end(JSON.stringify(reply))
            })
        }else{
            pgJsonResult =[]
            
        }
        dao.disconnect
    })
})

app.get('/redis/cptclientquitter/:commerceId',function(request,response){
    let pgJsonResult
    dao.connect()
    dao.query('SELECT cpt_client_quitter from public.cles_redis where id_commerce = $1',[request.params.commerceId],(result)=>{
        if (result.rowCount>0){
            pgJsonResult= result.rows
            client.get(pgJsonResult[0].cpt_client_quitter,function(err,reply){
                response.end(JSON.stringify(reply))
            })
        }else{
            pgJsonResult =[]
            
        }
        dao.disconnect
    })
})
    // function(request,response)
    // let pgJsonResult = null
       //**************************************************************************************** */
    // dao.connect()
    // dao.query('SELECT * From public.cles_redis', [], (result) => {
    //     if (result.rowCount > 0) {
    //             pgJsonResult = result.rows
    //     } else {
    //         pgJsonResult = []            
    //     }
    //     response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_JSON })
    //     // response.end(JSON.stringify(pgJsonResult))
    //     dao.disconnect()
    //     client.set(pgJsonResult[0].nom_cpt_client+'', 0, function(){})
    //     client.get(pgJsonResult[0].nom_cpt_client+'', function(err,reply){
    //     client.hmset(pgJsonResult[0].nom_client+ ''+reply,{'potition':''+reply},function(){})
    //     client.hgetall(pgJsonResult[0].nom_client+ ''+reply,function(err,rep){
    //     response.end(JSON.stringify(rep))
    //     })
    //     })
    // })
    
// })

// app.post('/queueio/prendreNumero/:commerceId,:telephone,:nom',controler_post.prendreNumero)

app.post('/queueio/prendreNumero/:commerceId,:telephone,:nom',function(request,response){
    let pgJsonResult
    dao.connect()
    dao.query('SELECT * from public.cles_redis where id_commerce = $1',[request.params.commerceId],(result)=>{
        if (result.rowCount>0){
            pgJsonResult= result.rows
            client.incr(pgJsonResult[0].nom_cpt_client+'',function(){})
                    client.get(pgJsonResult[0].nom_cpt_client+'',function(err,reply){
                        client.hmset(pgJsonResult[0].nom_client+reply+'',{'position': ''+reply ,'tel':request.params.telephone+'','nom':request.params.nom+''},function(){})
                        client.rpush(pgJsonResult[0].nom_commerce_list+'',pgJsonResult[0].nom_client+reply+'')
                        response.end(JSON.stringify(pgJsonResult[0].nom_client+reply+''))
                    })
        }else{
            pgJsonResult =[]
            response.end('client non trouve')
        }
        dao.disconnect
    })
})

// app.post('/queueio/prendre_numero/:idcommerce,:nom,:telephone',function(request,response){

    
//     let pgJsonResult = null
       
//     dao.connect()
//     dao.query('SELECT * From public.cles_redis', [], (result) => {
//         if (result.rowCount > 0) {
//                 pgJsonResult = result.rows
//         } else {
//             pgJsonResult = []            
//         }
//         response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_JSON })
//         // response.end(JSON.stringify(pgJsonResult))
//         dao.disconnect()
//         // client.set(pgJsonResult[0].nom_cpt_client+'', 0, function(){})
//         // client.get(pgJsonResult[0].nom_cpt_client+'', function(err,reply){
//         // client.hmset(pgJsonResult[0].nom_client+ ''+reply,{'potition':''+reply},function(){})
//         // client.hgetall(pgJsonResult[0].nom_client+ ''+reply,function(err,rep){
//         // response.end(JSON.stringify(rep))
//         client.incr('nb',function(){})
//         client.get('nb',function(err,reply){
//         console.log(reply)
//         client.hmset('client'+reply, {'nom':''+request.params.nom,'telephone': ''+request.params.tel,'potition':''+reply});
//     })
//      // response.end(JSON.stringify(rep))
       
        
//     })
// //     client.incr('nb',function(){})
// //     client.get('nb',function(err,reply){
// //         console.log(reply)
// //         client.hmset('client'+reply, {'nom':''+request.params.nom,'telephone': ''+request.params.tel,'potition':''+reply});
// //     })
// //     response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_JSON })
// //     // client.hmset('client', {'id': 'example3','nom': 'example4','telephone': 'example5','idcommerce':''+request.params.idcommerce,'potition':''+rep});
// })




app.put('/redis/incrementCptServi/:idcommerce',controleur_update.incrementCptServi)
app.put('/redis/incrementCptQuitte/:idcommerce',controleur_update.incrementCptQuitte)

app.delete('/redis/deleteClientList/:idCommerce,:keyClient',function(request,response){
    let pgJsonResult
    dao.connect()
    dao.query('SELECT * from public.cles_redis where id_commerce = $1',[request.params.idCommerce],(result)=>{
        if (result.rowCount>0){
            pgJsonResult= result.rows
            client.lrem(pgJsonResult[0].nom_commerce_list,1,request.params.keyClient,function(){})
        }else{
            pgJsonResult =[]
        }
        dao.disconnect
    })
})

// *********************************
    // client.get('nb',function(err,reply){
    //     console.log(reply)
    //     const rep={'nb':reply}
    //     response.end(JSON.stringify(rep))
    // })

app.listen(PORT,function(){
    console.log('server listening on http://localhost:%s',PORT)
})