'use strict'

const express =require('express')
const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser')
const {response} = require('express')
const controler = require('./backend/controler/controler')
const controlerUpdate = require('./backend/controler/controleur_update')
const controler_post = require('./backend/controler/controler_post')
const dao = require('./backend/BD/dao')
const redis = require('redis');
let client =redis.createClient({port:6379,host:'127.0.0.1'});

const app=express()


const PORT=3000
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'

//GET
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
// REDIS
//************* */
//creation cpt et client
//Retourn position client.
app.get('/queueio/cles_redis',function(request,response){
  
    let pgJsonResult = null
       
    dao.connect()
    dao.query('SELECT * From public.cles_redis', [], (result) => {
        if (result.rowCount > 0) {
                pgJsonResult = result.rows
        } else {
            pgJsonResult = []            
        }
        response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_JSON })
        // response.end(JSON.stringify(pgJsonResult))
        dao.disconnect()
        client.set(pgJsonResult[0].nom_cpt_client+'', 0, function(){})
        client.get(pgJsonResult[0].nom_cpt_client+'', function(err,reply){
        client.hmset(pgJsonResult[0].nom_client+ ''+reply,{'potition':''+reply},function(){})
        client.hgetall(pgJsonResult[0].nom_client+ ''+reply,function(err,rep){
        response.end(JSON.stringify(rep))
        })
        })
    })
    
})

app.post('/queueio/prendre_numero/:idcommerce,:nom,:telephone',function(request,response){

    
    let pgJsonResult = null
       
    dao.connect()
    dao.query('SELECT * From public.cles_redis', [], (result) => {
        if (result.rowCount > 0) {
                pgJsonResult = result.rows
        } else {
            pgJsonResult = []            
        }
        response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_JSON })
        // response.end(JSON.stringify(pgJsonResult))
        dao.disconnect()
        // client.set(pgJsonResult[0].nom_cpt_client+'', 0, function(){})
        // client.get(pgJsonResult[0].nom_cpt_client+'', function(err,reply){
        // client.hmset(pgJsonResult[0].nom_client+ ''+reply,{'potition':''+reply},function(){})
        // client.hgetall(pgJsonResult[0].nom_client+ ''+reply,function(err,rep){
        // response.end(JSON.stringify(rep))
        client.incr('nb',function(){})
        client.get('nb',function(err,reply){
        console.log(reply)
        client.hmset('client'+reply, {'nom':''+request.params.nom,'telephone': ''+request.params.tel,'potition':''+reply});
    })
     // response.end(JSON.stringify(rep))
       
        
    })
//     client.incr('nb',function(){})
//     client.get('nb',function(err,reply){
//         console.log(reply)
//         client.hmset('client'+reply, {'nom':''+request.params.nom,'telephone': ''+request.params.tel,'potition':''+reply});
//     })
//     response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_JSON })
//     // client.hmset('client', {'id': 'example3','nom': 'example4','telephone': 'example5','idcommerce':''+request.params.idcommerce,'potition':''+rep});
})


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
// *********************************
    // client.get('nb',function(err,reply){
    //     console.log(reply)
    //     const rep={'nb':reply}
    //     response.end(JSON.stringify(rep))
    // })

app.listen(PORT,function(){
    console.log('server listening on http://localhost:%s',PORT)
})