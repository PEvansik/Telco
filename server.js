const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
require ('dotenv').config()

const app = express()

let PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname,'views'))
app.set('view engine', 'ejs')


app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let db,
    dbString = process.env.DB_STRING,
    dbName = 'telcocustomers';
    
function createServer(mongodbClient) {
    console.log('connected to mongodb')
    db = mongodbClient.db(dbName);
    let telcust = db.collection('telcust');

    // ********** GET ************
    // serve the home page

    app.get('/', (req, res) => {
        telcust.find().toArray()
            .then(data => {
                console.log(data)
                res.render('index.ejs', {info: data})
            })
            .catch(err => console.error(err))
    })

    // ********** POST ************
    // create customers

    app.post('/details', (req,res) => {
        telcust.insertOne(req.body)
        .then(result => {

            console.log(req.body)

            res.redirect('/')
        })
        .catch(err => console.error(err))
    })

    app.put('/details', (req, res) => {
        telcust.findOneAndUpdate(
            {name: ""},
            {$set : {
                name: req.body.name,
                number: req.body.number
            }},
            {
                upsert: true
            }
        );
    });

    app.listen(PORT, console.log(`Server running on port ${PORT}`))
}

MongoClient.connect(dbString, {useUnifiedTopology: true})
    .then(createServer)
    .catch(err => console.error(err))