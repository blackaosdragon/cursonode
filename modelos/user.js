'use strict'

const mongose = require('mongoose');
const crypto = require('crypto');
const Schema = mongose.Schema;
const bcrypt = require('bcrypt-nodejs');

const obtenerAvatar = `https://gravatar.com/avatar/?s=200&d=retro`

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true},
    displayName: String,
    avatar: String,
    password: { type: String, select: false},
    signUpDate: { type: Date, default: Date.now()},
    lastLogin: Date
})

UserSchema.pre('save', function(next){
    let user = this
    
    if (!user.isModified('password')){
        return next();
    } else {
        bcrypt.genSalt( 10, (err,salt) => {
            if(err){
                console.log(err);
                return next(err)
            } else {
                bcrypt.hash(user.password, salt, null,(err,hash) => {
                    if(err){
                        console.log(err);
                        return next(err)
                    } else {
                        user.password = hash;
                        next();
                    }
                })
            }
        })
    }
})

UserSchema.method.gravatar = function(){
    if(!this.email){
        return obtenerAvatar
    } else {
        const md5 = crypto.createHash('md5').update(this.email).digest('hex');
        return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
    }
}

module.exports = mongose.model('User',UserSchema);