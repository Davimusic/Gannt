'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import '../app/globals.css'
import { Menu } from '@/components/menu';

//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../../src/funciones/redux/store'; 

function About() {
  const objetoMatematico = useSelector(state => state.objetoMatematico);
  const [keyObjects, setKeyObjects] = useState([]); // Modificado aquí, parece borrar
  const [objects, setObjects] = useState([]); 
  const [sum, setSum] = useState(0); 

  
  const dispatch = useDispatch();


  useEffect(() => {
        setKeyObjects(objetoMatematico['llaves'])
        setObjects(objetoMatematico['diccionario arreglado'])
  }, [objetoMatematico]);

  useEffect(() => {
    if (objects !== undefined) {
      let total = 0;
      Object.keys(objects).forEach((key) => {
        objects[key].forEach((obj) => {
          total += obj['acumulado'];
        });
      });
      setSum(total);
    }
  }, [objects]);

  function renderizarObjetos() {
    if (typeof objects === 'undefined') {
      return null
    }

    return (
      <>
        <div style={{display: 'block', paddingBottom:'30px'}}>
          <h1>{sum}</h1>
          
        </div>
        <div className='scroll' style={{display: 'block', paddingBottom:'30px', height: '80vh', width: '100wv'}}>
            {Object.keys(objects).map((key, index) => (
                <> 
                  {index !== 0 ? <div style={{paddingTop:'10px'}}></div> : null} 
                  <div className='centrar' style={{marginBottom: '20px', top: 0, position:'sticky'}}>
                    <div style={{width: '100%'}}>
                        <h1 style={{padding: '10px'}} className='color1 bordes borde'>objeto matematico {key}</h1>
                    </div>
                  </div>
                    
                    {objects[key].map((obj, index) => (
                        <div key={index} className='centrar' style={{display: 'flex', paddingBottom: '10px'}}>
                            <div style={{width: '100%'}}>
                                <p style={{padding: '10px'}} className='color1 bordes borde'><strong>Título:</strong></p>
                                <p style={{padding: '10px'}} className='color2 bordes borde'>{obj.titulo}</p>
                            </div>
                            <div style={{width: '100%'}}>
                                <p style={{padding: '10px'}} className='color1 bordes borde'><strong>Acumulado:</strong></p>
                                
                                <p style={{padding: '10px'}} className='color2 bordes borde'>{JSON.stringify(obj['acumulado'], null, 2)}</p>
                            </div>
                            <div style={{width: '100%'}}>
                                <p style={{padding: '10px'}} className='color1 bordes borde'><strong>Valor Dinámico:</strong></p>
                                <p style={{padding: '10px'}} className='color2 bordes borde'>{obj['valor dinamico']}</p>
                            </div>
                        </div>
                    ))}
                </>
            ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Menu></Menu>
      <div className='imagenFondo' style={{padding: '2%'}}>
        {renderizarObjetos()}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <About />
    </Provider>
  );
}



