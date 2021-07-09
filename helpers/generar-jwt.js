const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };    // Se usa un objeto para el caso se desee guardar más info en el payload

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '24h',    // el token durará 4 horas
        }, ( error, token ) => {
            if (error){
                console.log(error);
                reject('No se pudo generar el JWT');
            } else{
                resolve(token);
            }
        });

    });

}

module.exports = {
    generarJWT
}