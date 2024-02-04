export  function retornarLlavesActividades(tasks) {
    let arr = ['inicio']
    for (let llave in tasks) {
        arr.push(llave)
    }
    return arr
}