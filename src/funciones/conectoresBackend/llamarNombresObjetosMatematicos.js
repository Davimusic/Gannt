export default async function llamarNombresObjetosMatematicos() {
    localStorage.setItem('email', 'davipianof@gmail.com')//debe quitarse despues
    const data = { correo: localStorage.getItem('email') };////debe quitarse despues

    try {
        const response = await fetch('/api/getKeys', {
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

        const res = await response.json();
        console.log(JSON.stringify(res));
        return(res)
    } catch (error) {
        console.error('Error obteniendo las claves:', error);
    }
}