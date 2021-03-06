const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type : 'list',
        name : 'opcion',
        message : '¿Qué desea hacer?',
        choices : [
            {
                value : 1,
                name : ` ${'1.'.green}Buscar Ciudad`
            },
            {
                value : 2,
                name : ` ${'2.'.green}Historial`
            },
            {
                value : 0,
                name : ` ${'0.'.green}Salir`
            },
        ]
    }
];

const menu = [{
    type : 'input',
    name : 'option',
    message : `Presione ${ 'ENTER'.green } para continuar`,
}];

const inquirerMenu = async() => {

    console.clear();
    console.log('=============================='.green);
    console.log('   Seleccione una opcción '.white);
    console.log('==============================\n'.green);

    const { opcion }  = await inquirer.prompt(menuOpts);
    return opcion
}

const pause2 = async() => {
    
    console.log('\n');
    const { stop } = await inquirer.prompt(menu);
    return stop
}

const leerInput = async(msg) => {

    const question = [
        {
            type : 'input',
            name : 'desc',
            message : msg,
            validate( value ) {
                if(value.length === 0 ) {
                    return 'Ingrese un valor';
                }
                return true;
            } 
        }
    ];

    const {  desc } = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async( lugares = [] ) => {

    const choices = lugares.map( (lugar, i) => { 
        
        const idx = `${i + 1}.`.green;

        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        }

    });

    choices.unshift({
        value:'0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ]

    const { id }  = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async( msg ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: msg
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => { 
        
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }

    });


    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids }  = await inquirer.prompt(preguntas);

    return ids;
}

module.exports = {
    inquirerMenu,
    pause2,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}