const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer');
let comando = argv._[0];

switch (comando) {
    case 'crear':

        let tarea = porHacer.crear(argv.descripcion);

        console.log(tarea);

        break;
    case 'listar':

        listar();

        break;
    case 'actualizar':

        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);

        console.log('======================================'.blue);
        console.log(argv.descripcion);
        console.log('Estado: ', argv.completado);
        console.log('======================================'.blue);

        break;
    case 'borrar':

        let borrado = porHacer.borrarTarea(argv.descripcion);

        listar();

        break;

    default:
        console.log('comando no reconocido');
}

function listar() {

    let listado = porHacer.getListado();

    for (let tarea of listado) {

        console.log('==========Por Hacer==================='.green);
        console.log(tarea.descripcion);
        console.log('Estado: ', tarea.completado);
        console.log('======================================'.green);
    }

}