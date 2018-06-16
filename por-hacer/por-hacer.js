const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {

        if (err)
            throw new Error('No se puedo grabar', err);
    });
};

const cargarDB = () => {

    // ponemos try catch porque si el fichero esta vacío no devuelve un JSON válido
    try {
        listadoPorHacer = require('../db/data.json'); // asi cargamos un archivo JSON en un array

    } catch (error) {
        listadoPorHacer = [];
    }

};

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion, // esto con ES6 es lo mismo que poner descripcion = descripcion
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

};

const getListado = () => {

    cargarDB();

    return listadoPorHacer;

};

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion); // esto recorre cada uno de los elementos del array devolviendo  solo el  primero de las ocurrencias

    if (index >= 0) {

        listadoPorHacer[index].completado = completado;

        guardarDB();

        return true;
    }

    return false;

}

const borrarTarea = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion); // esto recorre cada uno de los elementos del array devolviendo  solo el  primero de las ocurrencias

    if (index >= 0) {

        let borrado = listadoPorHacer.splice(index, 1);

        if (borrado) {
            guardarDB();

            return true;
        }

        return false;

    }

    return false;
};


module.exports = {
    crear,
    getListado,
    actualizar,
    borrarTarea
}