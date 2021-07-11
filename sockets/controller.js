const { Socket } = require('socket.io');

const comprobarJWT = require('../helpers/comprobar-jwt');
const { usuarioConectado, usuarioDesconectado } = require('./services/usuario');


const socketController = ( socket = new Socket ) => {

    // Se obtiene el token de la conexión por socket para verificar si es un usario válido
    const [ valido, uid ] = comprobarJWT( socket.handshake.headers['x-token'] );
    
    if ( !valido ) { return socket.disconnect(); }  // Si no hay token válido, corta la conexión

    // Cliente autenticado
    usuarioConectado( uid );

    // Ingresar al usuario a una sala específica con el id del receptor del mensaje
    socket.join( uid );

    // Escuchar del cliente el mensaje que quiere comunicar
    socket.on( 'mensaje-personal', ( payload ) => {
        // Enviar mensaje de vuelta al frontend para el usuario específico
        socket.to( payload.para ).emit( 'mensaje-personal', payload );
    });

    // console.log( 'Conectado: ', socket.id );

    socket.on('disconnect', () => {

        // console.log( 'Desconectado: ', socket.id );
        usuarioDesconectado( uid );

    });

    // Se escucha el evento mensaje del lado del cliente
    socket.on( 'mensaje', ( payload ) => {

        const { nombre } = payload;

        console.log(nombre);

        // Emitir el mensaje a todos los clientes conectados menos al mismo que realiza la conexión
        socket.broadcast.emit( 'mensaje', { mensaje: `${nombre} se ha integrado al server` });
        // Emitir el mensaje a el mismo que realiza la conexión
        socket.emit( 'mensaje', { mensaje: `${nombre} se ha integrado al server` });
    });

}

module.exports = {
    socketController
}

