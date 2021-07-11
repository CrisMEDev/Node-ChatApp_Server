const Mensaje = require('../../models/mensaje');


const grabarMensaje = async( payload ) => {

    /**
     * payload: {
     *      de: '',
     *      para: ''
     *      mensaje: ''
     * }
     */

    try {
        
        const mensaje = new Mensaje( payload );
        await mensaje.save();

        return true;

    } catch (error) {
        return false;
    }

}

module.exports = {
    grabarMensaje
}

