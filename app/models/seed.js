// seed.js will remove all the crypto coins first, then add the new ones. 

const mongoose = require('mongoose')
const Pet = require('./pet')

const db = require('../../config/db')

const startPets = [
    { name: 'Bitcoin', dateCreate: 'January 3, 2009', totalSupply: 21000000, currentPrice: 47270.50},
    { name: 'Ethereum', dateCreate: 'July 30, 2015', totalSupply: 18000000, currentPrice: 3407.98},
    { name: 'Binance Coin', dateCreate: 'July 25, 2017', totalSupply: 200000000, currentPrice: 448.77},
    { name: 'Dogecoin', dateCreate: 'December 4, 2013', totalSupply: null, currentPrice: 0.14}
]

// first we connect to the db via mongoose
mongoose.connect(db, {
	useNewUrlParser: true,
})
    .then(() => {
        // then we remove all the pets except the ones that have an owner
        Pet.deleteMany({ owner: null })
            .then(deletedPets => {
                console.log('deleted pets', deletedPets)
                // then we create using the startPets array
                // we'll use console logs to check if it's working or if there are errors
                Pet.create(startPets)
                    .then(newPets => {
                        console.log('the new pets', newPets)
                        mongoose.connection.close()
                    })
                    .catch(err => {
                        console.log(err)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    // then at the end, we close our connection to the db
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })