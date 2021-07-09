const { Socket } = require("socket.io");


const socketController = ( socket = new Socket ) => {

    console.log( 'Conectado: ', socket.id );

    socket.on('disconnect', () => {

        console.log( 'Desconectado: ', socket.id );

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

