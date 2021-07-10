const { Router } = require('express');

const { obtenerUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Se pasa la referencia del controller correspondiente para la petición de logeo

router.get('/', validarJWT, obtenerUsuarios );

module.exports = router;

