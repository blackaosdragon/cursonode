'use strict'

module.exports = {
    port: process.env.PORT || 5003,
    db: process.env.MONGODB || 'mongodb://localhost:27017/makristrally',    
    SECRET_TOKEN: 'token1STRUM3NT4C10N'
}