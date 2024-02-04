import { useState, useEffect } from 'react';

export default function FechaSelector(props) {
    const [fecha, setFecha] = useState(convertirFecha(props.fechaInicial));

    function convertirFecha(fecha) {
        
        const meses = {
            enero: '01',
            febrero: '02',
            marzo: '03',
            abril: '04',
            mayo: '05',
            junio: '06',
            julio: '07',
            agosto: '08',
            septiembre: '09',
            octubre: '10',
            noviembre: '11',
            diciembre: '12'
        };
    
        const partes = fecha.split(/(\d+)/).filter(Boolean);
        const año = partes[0];
        const mes = meses[partes[1].toLowerCase()];
        const dia = partes[2].padStart(2, '0');
    
        return `${año}-${mes}-${dia}`;
    }
    

    useEffect(() => {
        console.log(fecha);
    }, [fecha]);

    const manejarCambio = (event) => {
        setFecha(event.target.value);
        props.onFechaChange(event.target.value);
    };

    return (
        <div className='centrar' style={{width: '100%'}}>
            <input type="date" value={fecha} onChange={manejarCambio} />
        </div>
    );
}

