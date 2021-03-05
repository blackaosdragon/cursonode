'use strict'

const mongose = require('mongoose');
const User = require("../modelos/user.js");
const status = require('../status.js')
const service = require("../services/index.js");
const user = require('../modelos/user.js');
const { unknow, ok } = require('../status.js');
//////
const fecha = require("../services/fecha.js");
//////
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config.js');
const { response } = require('express');

const singUp = (req,res) => {
    const {email,name,password} = req.body
    const user = new User({
        email: email,
        displayName: name,
        password: password
    })
    /*
    console.log(user);
    res.status(status.ok).send({
        token: service.createToken(user),
        ok: 1
    })
    */

    user.save( (err,userStorage)=>{
        if(err){
            console.log(err);
            res.status(status.failed).send({
                message: "Error al segistrar al usuario intente de nuevo",
                ok: 0
            })
        } else {
            //service.createToken(user);
            //console.log(service.createToken(user))
            res.status(status.ok).send({
                token: service.createToken(user),
                message: "usuario registraod con éxito",
                ok: 1
            })
        }        
    })
    
}
const singIn = (req,res) => {
    user.find( { email: req.body.email},(err,usuario)=>{
        if(err){
            res.status(status.failed).send({
                message: "Error, vuelva a intentarlo más tarde",
                ok: 0
            })
        } else if(!user){
            res.status(status.unknow).send({
                message: "Usuario no encontrado",
                ok: 0
            })            
        } else {
            req.user = user;
            res.status(status.ok).send({
                message: "Logueado correctamente",
                ok: 1,
                token: service.createToken(user)
            })
        }
    })
}
const getUsers = (req,res) => {
    user.find({},(err,usuarios)=>{
        if(err){
            res.status(failed).send({
                message: "Error del servidor intente más tarde",
                ok: 0
            })
        } else if(!usuarios){
            res.status(unknow).send({
                message: "No se han encontrado usuarios",
                ok: 0
            })
        } else {
            res.status(ok).send({
                usuarios: usuarios,
                ok: 1
            })
        }
    })
}
const registro = (req,res) => {
    const { name, mail, password} = req.body
    const user = new User({
        email: mail,
        displayName: name,
        password: password
    })
    let payload = {
        user: user._id
    }
    let token = jwt.encode(payload,config.SECRET_TOKEN);
    console.log(token);
    let decode = jwt.decode(token,config.SECRET_TOKEN)
    console.log(decode);
    res.status(200).send({
        message: "exitoso",
        ok: 1
    })
    /*
    service.createNewToken(user).then( token => {
        if(token){
            console.log("Token que sale de la promesa: ",token);
            let decodificado = jwt.decode(token,config.SECRET_TOKEN);
            console.log("Token Decodificado: ",decodificado);
            res.status(status.ok).send({
                token: token
            })
        } else {
            console.log("Dentro de la promesa algo fallo")
            res.status(status.unknow).send({
                message: "Fallo del servdor"
            })
        }
    })
    */
    /*
    let pass = new Promise( (resolve,reject) => {
        bcrypt.genSalt( 10, (err,salt) => {
            if(err){
                console.log(err);
                reject();
            } else {
                console.log(salt)
                bcrypt.hash(password,salt,null,(err,hash)=>{
                    if(err){
                        console.log(err);
                        reject();
                    } else {
                        console.log(hash)
                        resolve(hash);
                    }
                })
            }
        })

    })
    pass.then( response => {
        const user = new User({
            email: mail,
            displayName: name,
            password: response
        })
        let secret = 'instrumentacion'
        let token = jwt.encode(user,secret);
        console.log("Token: ",token);
        let decodificado = jwt.decode(token,secret);
        console.log("Decodificado: ",decodificado);
        res.status(200).send({
            message: "exitoso",
            ok: 1
        })
    })
    console.log(pass);
    
    //console.log(user);    
    */
    
}
module.exports = {
    singIn,
    singUp,
    getUsers,
    registro
}