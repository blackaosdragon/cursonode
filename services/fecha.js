'use strict'

const obtenerFecha = (cantidad,variable) => {
    const fecha = new Date();
    let mes = parseInt(fecha.getMonth()+1);
    if(cantidad){
        switch (variable) {
            case 'meses':
                mes = mes+cantidad;
                if(mes>12){
                    mes = mes - 12;
                    return (fecha.getDate()+''+mes+''+fecha.getFullYear());
                } else {
                    return (fecha.getDate()+''+mes+''+fecha.getFullYear());
                }
                break;
            case 'dias':
                break;
            case 'years':
                break;
            default:
                break;
        }

    } else {
        console.log(fecha.getDate()+''+mes+''+fecha.getFullYear());
        return (fecha.getDate()+''+mes+''+fecha.getFullYear());
    }
    
}

module.exports = {
    obtenerFecha
}

/*
12 + 1 = 13
 13 - 12= 1
*/