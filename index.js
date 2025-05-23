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
            case 'GET':  // npm run start GET products
                if (args[1] != undefined && args[1] == 'products') {
                    console.log(productos)
                } else if (args[1] != undefined && args[1].charCodeAt(8) == 47) {
                    let id = obtenerId(args[1])
                    console.log(productos[id - 1]);
                } else {
                    console.log("No se ha pasado un dato");
                }
                break;
            case 'POST': // npm run start POST products T-Shirt-Rex 300 remeras
                if (args[1] === undefined || args[1] != 'products' || args[2] === undefined || args[3] === undefined || args[4] === undefined) {
                    console.log(`No se ha pasado el argumento esperado`);
                } else {
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: args[2],
                            price: args[3],
                            category: args[4],
                        })
                    })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(error => console.error('Error:', error));
                }
                break;
            case 'DELETE': //npm run start DELETE products/7
                if (args[1] !== undefined && args[1].charCodeAt(8) == 47 && args[1].length > 9) {
                    let id = obtenerId(args[1])
                    fetch(url + '/' + id, {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(data => console.log("Producto eliminado", data))
                        .catch(error => console.error('Error al eliminar el producto:', error));
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