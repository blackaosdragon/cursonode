'use strict'
const mongoose = require('mongoose');
const Product = require("../modelos/modelo.js");
const ok = 200;
const failed = 500;
const unknow = 404;

const getProduct = (req,res) => {
    const { productID } = req.params
    Product.findById(productID, (err,articulo) => {
        if(err){
            console.log(err)
            res.status(failed).send({
                message: `Error al realizar la peticion`,
                ok: 0
            })
        } else if(!articulo){
            res.status(unknow).send({
                message: `Producto no encontrado`,
                ok: 0
            })
        } else {
            res.status(ok).send({
                product: `${articulo}`,
                ok: 1
            })
        }
    })
}


function getProducts(req,res) {
    Product.find({}, (err,articulo) => {
        if(err){
            console.log("Error al buscar el articulo")
            return res.status(failed).send({
                message: "Error buscar articulo intentelo de nuevo",
                ok: 0
            })
        } else if(!articulo) {
            return res.status(unknow).send({
                message: "No existen articulos",
                ok: 0
            })
        } else {
            res.status(ok).send({
                articulo: articulo,
                ok: 1
            })
        }
    })
}

const saveProduct = (req,res) => {
    console.log(req.body)
    let product = new Product();
    product.id = req.body.id
    product.nombre = req.body.nombre
    product.precio = req.body.precio
    product.collecion = req.body.collection 
    product.description = req.body.description 
    product.save( (err, productStorage) => {
        if (err){
            console.log(err)
            res.status(failed).send( 
                {
                    message: `Error al guardar en la base de datos. Error ${err}`,
                    ok: 0
                }
            )
        } else {
            res.status(ok).send( 
                {
                    ok: 1,
                    message: `${productStorage}`
                }
            )

        }
    })
}

const updateProduct = (req,res) => {
    const {productID} = req.params;
    const update = req.body;

    Product.findByIdAndUpdate(productID,update,(err,productoActualizado)=>{
        if (err){
            console.log(err)
            res.status(failed).send({
                message: "Error al actualizar, intentalo de nuevo",
                ok: 0
            })
        } else {
            res.status(ok).send({
                message: `Actualizado con éxito ${productoActualizado}`,
                ok:1
            })            
        }
        
    })
}

const deleteProduct = (req,res) => {
    console.log("Entro al delete")
    const { productID } = req.params
    Product.findById(productID,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).send({
                message: `Ha ocurrido un error, intentelo de nuevo Error: ${err}`,
                ok: 0
            })
        }  else {
            result.remove ( err => {
                if(err){
                    res.status(failed).send({
                        message: `Ha ocurrido un error al borra ${err}`,
                        ok: 0
                    })
                } else {
                    res.status(ok).send({
                        message: `Se ha borrado con éxito`,
                        ok: 1
                    })
                }
            })
        }
    })
}

module.exports = {
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    saveProduct
    
}