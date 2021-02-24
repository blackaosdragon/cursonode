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
                let calculando_dias = 1;
                let dias = parseInt(fecha.getDate() + cantidad);
                let years = parseInt(fecha.getFullYear());
                while(calculando_dias){
                    if(mes==2){
                        if(dias>28){
                            mes = mes + 1;
                            dias = dias % 28 //dias de febrero
                        } else {
                            calculando_dias = 0;
                        }
                    }
                    if(mes%2 == 0){
                        if(dias>30){
                            mes = mes + 1;
                            dias = dias % 30; //dias de los meses pares
                        } else {
                            calculando_dias = 0;
                        }
                    }
                    if( mes % 2 == 1){
                        if(dias>31){
                            mes = mes + 1;
                            dias = dias % 31; //dias de los meses impares
                        }
                    }
                    if(mes>13){
                        years + 1;
                    } else {

                    }
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