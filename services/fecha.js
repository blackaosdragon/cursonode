'use strict'

const obtenerFecha = (cantidad,variable) => {
    const fecha = new Date();
    let mes = parseInt(fecha.getMonth()+1);
    if(cantidad){
        switch (variable) {
            case 'meses':
                mes = mes+cantidad;
                console.log(mes)
                if(mes>12){
                    let oneYear = 12;
                    let increaseYears = Math.floor(cantidad / oneYear);
                    mes = mes%oneYear;
                    let year = increaseYears + parseInt(fecha.getFullYear());
                    return (fecha.getDate()+''+mes+''+year);
                } else {
                    return (fecha.getDate()+''+mes+''+fecha.getFullYear());
                }
                break;
            case 'dias':
                let dias = parseInt(fecha.getDate() + cantidad);
                if(mes==2){
                    if(dias>28){
                        mes = mes + 1;
                        dias = dias%28;
                    } else {
                        return(dias+''+mes+''+fecha.getFullYear())
                    }
                } else if (mes%2==0 && mes!=2){

                } else if (mes%2==1){

                }
                break;
            case 'years':
                break;
            default:
                break;
        }

    } else {
        //console.log(fecha.getDate()+''+mes+''+fecha.getFullYear());
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