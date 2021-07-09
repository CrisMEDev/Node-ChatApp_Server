const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, renewToken } = require('../controllers/chat_auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Se pasa la referencia del controller correspondiente para la petición de logeo

// Crear usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], crearUsuario );

// Autenticar usuario
router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], loginUsuario );

router.get('/renew', validarJWT, renewToken );

module.exports = router;

