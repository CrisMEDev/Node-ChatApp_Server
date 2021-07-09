const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario } = require('../controllers/chat_auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Se pasa la referencia del controller correspondiente para la petición de logeo
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], crearUsuario );

module.exports = router;

