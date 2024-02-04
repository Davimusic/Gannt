export default async function llamarTodoObjetoMatematico() {
    const data = { correo: 'davipianof@gmail.com' };//se debe quitar despues

    try {
        const response = await fetch('/api/getAllObjects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        const result = await response.json();
        //console.log(JSON.stringify(result)); 
        return result
    } catch (error) {
        console.error('Error obteniendo todos los objetos:', error);
    }
}
