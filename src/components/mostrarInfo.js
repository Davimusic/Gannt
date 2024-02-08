import React, { useState } from 'react';
import '../estilos/mostrarInfo.css'

const MostrarInfo = ({informacion, contenido, width, height}) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <div style={{width: width, height: height}} onMouseOver={() => setShowInfo(!showInfo)} className="container">
            {showInfo && 
                <div className="tooltip">
                    {informacion}
                </div>
            }
            {contenido}
        </div>
    );
};

export default MostrarInfo;

