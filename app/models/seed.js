// seed.js will remove all the crypto coins first, then add the new ones. 

const mongoose = require('mongoose')
const Crypto = require('./crypto')

const db = require('../../config/db')

const startCryptos = [
    { name: 'Bitcoin', dateCreated: 'January 3, 2009', totalSupply: 21000000, currentPrice: 47270.50},
    { name: 'Ethereum', dateCreated: 'July 30, 2015', totalSupply: 18000000, currentPrice: 3407.98},
    { name: 'Binance Coin', dateCreated: 'July 25, 2017', totalSupply: 200000000, currentPrice: 448.77},
    { name: 'Dogecoin', dateCreated: 'December 4, 2013', totalSupply: null, currentPrice: 0.14}
]

// first we connect to the db via mongoose
mongoose.connect(db, {
	useNewUrlParser: true,
})
    .then(() => {
        // then we remove all the cryptos except the ones that have an owner
        Crypto.deleteMany({ owner: null })
            .then(deletedCryptos => {
                console.log('deleted cryptos', deletedCryptos)
                // then we create using the startCryptos array
                // we'll use console logs to check if it's working or if there are errors
                Crypto.create(startCryptos)
                    .then(newCryptos => {
                        console.log('the new cryptos', newCryptos)
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