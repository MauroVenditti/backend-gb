const axios = require('axios');
const fs = require('fs');
const path = require('path');

const url = process.env.baseURL;

const pathFile = path.resolve(__dirname, '../data/data.json');

let listadoProductos = [];

// Guarda productos en el json
const guardar = () => {
    let data = JSON.stringify(listadoProductos);

    fs.writeFileSync(pathFile, data, (err) => {
        if (err) throw new Error('No se pudo guardar ', err);
    });
}

// Obtiene los productos del json 
const cargarProductos = () => {
    listadoProductos = require('../data/data.json');
    return listadoProductos;
}

// Actualiza estado del producto
const actualizarProductos = (itemUpd) => {
    lista = cargarProductos();

    let itemIndex = lista.items.findIndex(x => x.id == itemUpd.id);
    if (itemIndex == -1) {
        return 'El ID del producto es inexistente';
    }
    lista.items[itemIndex].enabled = itemUpd.habilitado;
    //return lista.items[itemIndex];
    return 'Estado del producto modificado';
}

// Obtiene los productos del api
const cargar = (items) => {
    //console.log(items);
    let productos = {
        'items': items,
    };

    listadoProductos = productos;
    guardar();
    return productos;
}

// llamar api poductos
const productosApi = () => {
    axios.get(`${url}/products`)
        .then((resp) => {
            resp.data.items.forEach(r => {
                r.enabled = true;
            });
            cargar(resp.data.items);
        })
        .catch((err) => {
            console.log(err);
        });
}

// Obtener detalle
const detalleApi = (id) => {

    return new Promise((resolve, reject) => {
        axios.get(`${url}/products/${id}`)
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });

}

module.exports = {
    productosApi,
    cargarProductos,
    actualizarProductos,
    detalleApi
}