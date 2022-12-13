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


function initServer(mongodbClient) {

        console.log('connected to mongodb')
        db = mongodbClient.db(dbName);
        let telcocust = db.collection('telcocust');

        // ********** GET ************
        // serve the home page

        app.get('/', async (_, res) => {
            try{
                let data = await telcocust.find().toArray()
                res.render('index.ejs', {info: data})
            }
            catch {
                err => console.error(err)
            }
        })

        /**
         * async function getAllCustomers(dbCollection) {
                await return await dbCollection.find().toArray()
            }

            async function createCustomer(dbCollection, customerInfo) {
               await  return dbCollection.insertOne(customerInfo)
            }
         * 

            async function updateCustomer(dbCollection, oldInfo, updatedInfo, upsertChoice) {
                await return dbCollection.findOneAndUpdate(
                    {name: oldInfo},
                    {
                        $set: {
                            name: updatedInfo.name,
                            number: updatedInfo.number
                        }
                    },
                    {
                        upsert: upsertChoice
                    }
                )
            }


            async function deleteCustomer(dbCollection, deletedCustomer) {
                await return dbCollection.deleteOne(
                    {name: deletedCustomer.name}
                )
            }
         */


        app.post('/details', async (req,res) => {
            try{
                let result = await telcocust.insertOne(req.body)
                console.log(result.json)
                res.redirect('/')
            }
            catch{err => console.error(err)}
        })

        app.put('/updatedetails', async (req, res) => {
            // console.log(req.body)
            try{
                let result = await telcocust.findOneAndUpdate(
                    {name: null},
                    {$set : {
                        name: req.body.name,
                        number: req.body.number
                    }},
                    {
                        upsert: true
                    }
                )
                if (!res.ok) return res.status(404)
                return res.redirect('/')
            }
            catch{
                err => console.error(err)
            }
        })

        app.delete('/deletedetails', async (req, res) => {
            try {
                let data = await telcocust.deleteOne({
                    name: req.body.name
                })
    
                if(data.deletedCount === 0) return res.json(`No ${req.body.name} record found`);
                return res.json(`Deleted ${req.body.name}`)
            }
            catch{err => console.error(err)}
        })

        app.listen(PORT, console.log(`Server running on port ${PORT}`))
}


MongoClient.connect(dbString, {useUnifiedTopology: True})
    .then(initServer)
    .catch(err => console.error(err));