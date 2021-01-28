const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array()})
    }


    // extraer e-mail y password
    const  { email, password } = req.body;

    try {
        // revisar que el usuario ingresado sea unico
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({msg: 'El usuario ya existe'});
        }
        // crea el nuevo usuario
        usuario = new Usuario(req.body);

        // hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // guarda el usuario
        await usuario.save();

        // mensaje de confirmacion
        // res.json({msg: 'Usuario creado correctamente'});

        // crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        
        // firmar el jwt
        jwt.sign(payload, process.env.SECRETA,
             { expiresIn: 3600 },       // 1h tiempo de expiración del token en segundos
             ( error, token ) => {
                 if (error) throw error;

                 // mensaje de confirmación
                 res.json({ token });
             }
             );

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un Error');
    }
}