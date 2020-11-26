'use strict'

const express =require('express')
const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser')
const {response} = require('express')
const controler = require('./backend/controler/controler')
const controlerUpdate = require('./backend/controler/controleur_update')
const controler_post = require('./backend/controler/controler_post')

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

// app.get('/commercetest/user/:role_id',controler.roleEmployee)//obtenir info employe-doesn't work
// app.get('/commercetest/login/:courriel/:mot_passe',controler.login) //login

//POST
// app.post('/commercetest/creation_commerce', tracksControleur.ajout)//creation commerce//Formulaire d'Inscription
app.post('/test/:nom/:adresse/:courriel/:mot_passe',controler_post.commerceInscription)//inscription
app.post('/test/employecreation/:nom/:courriel/:mot_passe/:id_commerce',controler_post.employecreation)//inscription
app.post('/test/servicesCreation/:nom_service/:duree_aprox',controler_post.servicesCreation)//inscription
// app.post('/test/login/:courriel/:mot_passe',controler_post.login)//Login

//PUT
app.put('/commercetest/updateC',controlerUpdate.updateCouleur)


// app.get('/test/:roleid',controler.user)
app.put('/update/horaire/:ouvertureSem,:fermetureSem,:ouvertureFinSem,:fermetureFinSem,:id',controlerUpdate.updateOuverture)
app.put('/update/commerce/:nom,:adress,:courriel,:mot_passe,:id',controlerUpdate.updateCommerce)
app.put('/update/updateCommerceConfig/:filtre_id,:logo,:couleur_id,:nb_minutes_retard,:temps_moyen_clients,:id',controlerUpdate.updateCommerceConfig)
app.put('/update/updateemployee/:nom,:courriel,:mot_passe,:id',controlerUpdate.updateemployee)
app.put('/update/updateService/:nom_service,:duree_aprox,:id',controlerUpdate.updateService)


app.get('/commerce',function(request,response){
    response.writeHead(HTTP_OK, {'Content-type':CONTENT_TYPE_HTML})
    response.end('<h1>soy get</h1>')
})
app.post('/post',function(request,response){
    response.writeHead(HTTP_OK, {'Content-type':CONTENT_TYPE_HTML})
    response.end('<h1>soy post</h1>')
})
app.put('/put',function(request,response){
    response.writeHead(HTTP_OK, {'Content-type':CONTENT_TYPE_HTML})
    response.end('<h1>soy put</h1>')
})
app.delete('/delete',function(request,response){
    response.writeHead(HTTP_OK, {'Content-type':CONTENT_TYPE_HTML})
    response.end('<h1>soy delete</h1>')
})


app.listen(PORT,function(){
    console.log('server listening on http://localhost:%s',PORT)
})