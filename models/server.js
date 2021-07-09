const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');
const { socketController } = require('../sockets/controller');


class Server {

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;

        // Agregando socket.io
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {  // Aqui se colocan las direcciones de los endpoints en caso de requerirlos
            auth:       '/api/chat/auth'
        };

        // Conectar a la base de datos
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    async dbConnection(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );

    }

    routes(){
        // Se usa un middleware para cargar ciertas rutas dependiendo de una ruta inicial
        this.app.use( this.paths.auth, require('../routes/chat_auth') );
    }

    sockets(){

        this.io.on( 'connection', socketController );

    }

    listen(){
        // Se levantar la instancia server en lugar de app
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en le puerto: ', this.port);
        });
    }

}


module.exports = Server;