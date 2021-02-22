'use strict'

const jsonWebToken = require('jwt-simple');

const createToken = usuario => {
    const payload = {
        sub: usuario._id,        
    }

}

module.exports = {
    createToken
}