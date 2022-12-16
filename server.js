const express = require('express')
const path = require('path')
const {getAllCustomers, createCustomer, updateCustomer, removeCustomer} = require('./services/user-service.js')
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
        const updatedCustomerDetails = req.body;

        try {
            await updateCustomer(customers, updatedCustomerDetails, 'Paul', false);
            return res.sendStatus(200);
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    });

    app.delete('/details', async (req, res) => {
        const customerToDelete = req.body;

        try {
            let data = await removeCustomer(customers, customerToDelete)

            if(data.deletedCount === 0) return res.status(400).json(`No ${customerToDelete.name} record found`);
            return res.status(400).json({ message: `Deleted ${customerToDelete.name}`})
        }
        catch{
            err => console.error(err)
            return res.status(500).json({ message: err.message });
        }
    })

    app.listen(PORT, console.log(`Server running on port ${PORT}`));
}

MongoClient.connect(dbString, {useUnifiedTopology: true})
    .then(initServer)
    .catch(err => console.error(err))