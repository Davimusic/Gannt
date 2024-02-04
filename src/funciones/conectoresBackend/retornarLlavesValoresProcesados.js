export function retornarLlavesValoresProcesados(diccionario){
    let llaves = [];
    let diccionarioArreglado = {};

    for (let llave in diccionario) {
    if (diccionario.hasOwnProperty(llave)) {
        llaves.push(llave);
        diccionarioArreglado[llave] = diccionario[llave].objetos;
    }
    }

    let resultado = {
    'llaves': llaves,
    'diccionario arreglado': diccionarioArreglado
    };

    return resultado
}