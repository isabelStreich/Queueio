'use strict'

const express =require('express')
const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser')
const {response} = require('express')
const controler = require('../controler/controler')
const controler_post = require('../controler/controler_post')

const app=express()

const PORT=3000
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'

app.get('/commercetest/:commerce_id',controler.commercesss) //obtenir un commerce
app.get('/commercetest/filtreId/:filtre_id',controler.commerceAvecFiltre)
app.get('/commercetest',controler.commercesTous) //obtenir la liste de tous les commerces
app.get('/commercetest/stats/:commerce_id',controler.commerceStat) //obtenir statistiques
app.get('/test/login/:courriel/:mot_passe',controler.login)//Login
// app.get('/commercetest/user/:role_id',controler.roleEmployee)//obtenir info employe-doesn't work
// app.get('/commercetest/login/:courriel/:mot_passe',controler.login) //login
//post
// app.post('/commercetest/creation_commerce', tracksControleur.ajout)//creation commerce//Formulaire d'Inscription
app.post('/test/:nom/:adresse/:courriel/:mot_passe',controler_post.commerceInscription)//inscription
// app.post('/test/login/:courriel/:mot_passe',controler_post.login)//Login


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