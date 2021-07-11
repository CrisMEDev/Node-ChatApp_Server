const { Router } = require('express');

const { obtenerMensajes } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Se pasa la referencia del controller correspondiente para la petición de logeo

router.get('/:de', validarJWT, obtenerMensajes );

module.exports = router;
