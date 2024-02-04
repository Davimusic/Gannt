import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateInfo } from "@/funciones/redux/actions";
import '../estilos/menu.css'
import '../../src/app/globals.css'

import llamarTodoObjetoMatematico from "@/funciones/conectoresBackend/llamarTodoObjetoMatematico";
import { retornarLlavesValoresProcesados } from "@/funciones/conectoresBackend/retornarLlavesValoresProcesados";

export function Menu(){
    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        /*llamarTodoObjetoMatematico().then(newObject => {
            console.log('llega menu');
            console.log(newObject);
            if(newObject !== undefined){
                let en = retornarLlavesValoresProcesados(newObject['objetos'][0])
                console.log('entrega');
                console.log(en);
                dispatch(updateInfo(en))
            }
        });*/
    }, [router.asPath]);

    const handleNavigation = (ruta) => {
        router.push(ruta);
        dispatch({ type: 'NAVIGATE', payload: ruta });
    };
    
    function changeMenuState(){
        setIsOpen(!isOpen)
    }

    return(
        <div className={`dropdown ${isOpen ? 'open' : ''}`}> 
            <img onClick={()=> changeMenuState()} className="imagenes" style={{margin: '5px'}} src="https://res.cloudinary.com/dplncudbq/image/upload/v1701542645/menu1_ui2fw4.png" alt="Descripción de la imagen" />
            {isOpen && (
                <div className='menuContent'>
                    <button onClick={() => handleNavigation('/about')}>Sobre nosotros</button>
                    <button onClick={() => handleNavigation('/')}>Inicio</button>
                </div>
            )}
        </div>
    )
}


