/**
 * Gets all the customers in the database
 * @param customerCollection the databases customer collection
 */
async function getAllCustomers(customerCollection) {
    return await customerCollection.find().toArray();
}

/**
 * Creates a new customer in the database
 * @param customerCollection the databases customer collection
 * @param customerInformation information about the new user
 */
async function createCustomer(customerCollection, customerInformation) {
    await customerCollection.insertOne(customerInformation);
}

/**
 * Updates a customer in the database
 * @param customerCollection the databases customer collection
 * @param updatedCustomer the updated customer information
 */
async function updateCustomer(customerCollection, updatedCustomer) {
    await customerCollection.findOneAndUpdate(
        { name: "" },
        { 
            $set: {
                name: updatedCustomer.name,
                number: updatedCustomer.number
            }
        },
        {
            upsert: true
        }
    );
}

module.exports = {
    getAllCustomers,
    createCustomer,
    updateCustomer
};