const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

let db
let flashCards = []
app.set('view engine', 'pug') 
app.use(express.static(`${__dirname}/public/`)); 
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://sandbox:sandbox1@ds045557.mlab.com:45557/firstset_flashcards', (err, database) => {
      if (err) return console.log(err)   
      db = database.db('firstset_flashcards')
      
     app.listen(8080, function() {   
         console.log("listening on port 8080")
    })
        
})

app.get('/', (req, res) => {
    let cursor = db.collection('Cards').find().toArray(function(err, results){
        if (err) return console.log(err)
        flashCards = results
        // console.log(results)
        res.render('index.pug', {flashCards: results})     
    }) 
})

app.get('/firstset_flashcards', (req, res) => {
    console.log(flashCards)
    res.send(flashCards)
})

app.get('/newCard',(req, res) => {
    res.render("newCard.pug")    
})

app.post('/firstset_flashcards', (req,res) => {
    db.collection('Cards').save(req.body, (err,result) => {
        if (err) return console.log(err)

        console.log('saved to database :)')
        res.redirect('/')
    })
})

app.delete('/firstset_flashcards', (req,res) => {
    db.collection('Cards').save(req.body, (err,result) => {
        if (err) return console.log(err)

        console.log('delete item')
        res.redirect('/')
    })
})