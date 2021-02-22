'use strict'

module.exports = {
    port: process.env.PORT || 5003,
    db: process.env.MONGODB || 'mongodb://localhost:27017/makristrally'
}