const express = require('express')
const path = require('path')
const { getAllCustomers, createCustomer, updateCustomer } = require('./services/user-service')
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
    
function initServer(mongodbClient) {
    console.log('connected to mongodb');
    db = mongodbClient.db(dbName);
    let customers = db.collection('telcust');

    app.get('/', async (_, res) => {
        try {
            const allCustomers = await getAllCustomers(customers);
            return res.render('index.ejs', {info: allCustomers});
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    });

    app.post('/details', async (req,res) => {
        const customerInformation = req.body;
        try {
            await createCustomer(customers, customerInformation);
            return res.sendStatus(200);
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    });

    app.put('/details', async (req, res) => {
        const updatedCustomer = {
            name: req.body.name,
            number: req.body.number
        };

        try {
            await updateCustomer(customers, updatedCustomer);
            return res.sendStatus(200);
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    });

    app.listen(PORT, console.log(`Server running on port ${PORT}`));
}

MongoClient.connect(dbString, {useUnifiedTopology: true})
    .then(initServer)
    .catch(err => console.error(err));