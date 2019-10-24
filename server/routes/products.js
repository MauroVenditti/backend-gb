require('../config/config');
const p = require('../controllers/productos');

const express = require('express');
const _ = require('underscore');
const app = express();

let lista = [];

// Listado de productos
app.get('/products', function(req, res) {
    lista = p.cargarProductos();
    return res.status(200).json({
        ok: true,
        data: lista,
    });
});

// Busqueda de producto
app.post('/products', async function(req, res) {
    let body = _.pick(req.body, ['termino']);
    let termino = body.termino;
    lista = p.cargarProductos();

    const regex = new RegExp(`${termino}\\b`, 'gi');
    const filtrados = lista.items.filter(({ description }) => description.match(regex));
    if (filtrados.length > 0) {
        return res.status(200).json({
            ok: true,
            data: filtrados,
        });
    } else {
        return res.status(404).json({
            ok: false,
            data: 'No se encontro ningun producto con esa descripción'
        });
    }

});

// Detalle de producto
app.get('/products/:id', async function(req, res) {
    let id = req.params.id;
    lista = p.cargarProductos();

    // Validar que exista el id
    let itemIndex = lista.items.findIndex(x => x.id == id);
    if (itemIndex == -1) {
        return res.status(404).json({
            ok: false,
            data: 'El ID del producto es inexistente'
        });
    }

    // Filtrar id y verificar estado
    let itemFiltrado = lista.items.filter(item => item.id == id);
    if (itemFiltrado[0].enabled) {
        p.detalleApi(itemFiltrado[0].id).then(detalle => {
            return res.status(200).json({
                ok: true,
                data: detalle,
            });
        });
    } else {
        return res.status(404).json({
            ok: false,
            data: 'El producto se encuentra deshabilitado',
        });
    }
});

// Cambio de estado del pruducto
app.patch('/products/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['enabled']);
    let habilitado = (body.enabled == "false" ? false : true);

    let item = {
        id,
        habilitado
    }

    lista = p.actualizarProductos(item);

    return res.status(200).json({
        ok: true,
        data: lista,
    });
});

module.exports = app;