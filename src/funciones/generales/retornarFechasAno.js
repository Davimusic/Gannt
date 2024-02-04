export function retornarFechasAno(){
    let ga = [];
        const year = new Date().getFullYear(); // Año actual
        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(year, month + 1, 0).getDate(); // Obtiene el número de días en el mes
            for (let day = 1; day <= daysInMonth; day++) {
                ga.push(`${new Date(year, month, day).toLocaleString('es-ES', { month: 'long' })}${day}`);
            }
        }
    return ga
}