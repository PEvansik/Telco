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
    return await customerCollection.insertOne(customerInformation);
}

/**
 * Updates a customer in the database
 * @param customerCollection the databases customer collection
 * @param updatedCustomer the updated customer information
 * @param existingInfo the existing customer information (it can be passed along with the request from the client side or entered manually fo this application)
 * @param option can be a true or false value
 */
async function updateCustomer(customerCollection, updatedCustomer, existingInfo, option) {
    return await customerCollection.findOneAndUpdate(
        { name: existingInfo },
        { 
            $set: {
                name: updatedCustomer.name,
                number: updatedCustomer.number
            }
        },
        {
            upsert: option
        }
    );
}

/**
 * Deletes a customer in the database
 * @param customerCollection the  database collection
 * @param deletedCustomer the deleted customer
 */
async function removeCustomer(customerCollection, deletedCustomer) {
    return await customerCollection.deleteOne({
        name: deletedCustomer.name
    })
}

module.exports = {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    removeCustomer
}