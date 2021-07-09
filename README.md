# **ChatApp backend**

Implementación de un server usando rest api y comunicación por sockets para una app en flutter

### **Configuraciones necesarias**

* Recordar reconstruir los módulos de node con ``` npm install ```

* Crear el archivo .env en el directorio raíz del proyecto y asignar:
    * El puerto a usar
    * El enlace para la conexión a la base de datos en la nube
    * El password firma para el JWT

Ejemplo:
```
PORT=8080
MONGODB_CNN=mongodb+srv://{MyUserName}:{MyPassword}@miclustercafe.noxip.mongodb.net/{myDbName}
SECRETORPRIVATEKEY=MyUltraSecretPassword
```

* No olvidar agregar las ip de conexión deseadas a la lista blanca de la base de datos de mongo

### **Documentación usada**

[Express](https://www.npmjs.com/package/express)

[Dotenv](https://www.npmjs.com/package/dotenv)

[CORS](https://www.npmjs.com/package/cors)

[socket.io](https://www.npmjs.com/package/socket.io)

[bcryptjs](https://www.npmjs.com/package/bcryptjs)

[express-validator](https://www.npmjs.com/package/express-validator)

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

[mongoose](https://www.npmjs.com/package/mongoose)


