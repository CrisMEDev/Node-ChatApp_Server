
let socket = io();

socket.on( 'connect', () => {
    console.log('Conectado al servidor como: ', socket.id);
});

socket.on( 'disconnect', () => {
    console.log('Desonectado al servidor como: ', socket.id);
});


// Evento a emitir al backend server
socket.emit( 'mensaje', { nombre: 'Cristian' });

// Escuchando el evento 'mensaje' del lado del server
socket.on( 'mensaje', ( respuestaServer ) => {
    const { mensaje } = respuestaServer;

    console.log( mensaje );
});

