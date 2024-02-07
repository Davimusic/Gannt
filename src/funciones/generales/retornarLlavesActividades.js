export function retornarLlavesActividades(tasks) {
    let arr = [];
    for (let llave in tasks) {
        arr.push(llave);
    }
    arr.sort(); // Ordena el array alfabéticamente
    arr.unshift('inicio'); // Agrega 'inicio' al principio del array
    return arr;
}
