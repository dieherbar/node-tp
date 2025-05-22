const url = 'https://fakestoreapi.com/products';
const config = {
    method: 'GET'
};
const productos = [];
const obtenerId = function id(p) {
    let texto = p.split("/")
    return texto[1]
};

fetch(url, config)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((element) => {
            productos.push(element);
        });

        const args = process.argv.slice(2);

        switch (args[0]) {
            case 'GET':
                if (args[1] != undefined && args[1] == 'products') {
                    console.log(productos)
                } else if (args[1] != undefined && args[1].charCodeAt(8) == 47) {
                    let id = obtenerId(args[1])
                    console.log(productos[id - 1]);
                } else {
                    console.log("No se ha pasado un dato");
                }

                break;

            case 'POST':
                if (args[1] === undefined) {
                    console.log(`No se ha pasado el id`);
                } else {
                    console.log(`Recibimos ${args[1]}  satisfactoriamente`);
                }
                break;
            case 'PUT':
                if (args[1] != undefined) {
                    console.log(`Modificamos el item con id: ${args[1]}  satisfactoriamente`);
                } else {
                    console.log(`No se ha podido modificar el item, no se ha pasado el id`);
                }
                break;
            case 'DELETE':
                if (args[1] !== undefined) {
                    console.log(`El item con id: ${args[1]}  se eliminó con éxito`);
                } else {
                    console.log(`No se ha podido eliminar el item, no se ha pasado el id`);
                }
                break;
            default:
                console.log('Comando no reconocido.');
        }
    }
    )
    .catch((error) => console.error('Error al hacer fetch:', error));