const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const aut = require('../middlewares/autenticacion');

const app = express();


app.get('/usuario', aut.verificaToken, (req, res) => {


    return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email
    });



    let condicion = { estado: true };

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find(condicion, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });

            };

            Usuario.count(condicion, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cantidad: conteo
                });

            });

        });

});



app.post('/usuario', [aut.verificaToken, aut.verificaAdminRole], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({

        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //hace el almacenamiento en la base
    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        };

        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id', [aut.verificaToken, aut.verificaAdminRole], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: false }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});



app.delete('/usuario/:id', [aut.verificaToken, aut.verificaAdminRole], function(req, res) {

    let id = req.params.id;
    let cambiaEstado = { estado: false };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: false }, (err, usuarioDel) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        };


        if (usuarioDel === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });

        };

        res.json({
            ok: true,
            usuario: usuarioDel
        });

    });


});


module.exports = app;
