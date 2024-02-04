"use client"

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateMirar } from '@/funciones/redux/actions';

export function Prueba(){
    const mirar = useSelector(state => state.mirar);

    const dispatch = useDispatch();

    const cambiarMirar = () => {
        dispatch(updateMirar('nuevo valor'));
    };
    return(
        <div>
            <h2>hola mundo</h2>
            <h2>{mirar}</h2>
            <button onClick={cambiarMirar}>
                Cambiar Mirar
            </button>
        </div>
        )
}