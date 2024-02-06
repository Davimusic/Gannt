import FechaSelector from "./fechaSelector";
import { useState, useEffect, useRef } from "react";
import { ModalUser } from "./modal";
import { CreateSelect } from "./selects";
import { retornarDias } from "@/funciones/generales/retornarDias";
import { retornarLlavesActividades } from "@/funciones/generales/retornarLlavesActividades";
import { retornarFechasAno } from "@/funciones/generales/retornarFechasAno";
import { retornarMesesDelAno } from "@/funciones/generales/retornarMesesDelAno";

import { useSelector, useDispatch } from 'react-redux';


export function GanttTable({}) {
    const [fechaInicio, setFechaInicio] = useState('enero1');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [gantt, setGannt] = useState([]);
    const [anoEnUso, setAnoEnUso] = useState('2024');
    const [value, setValue] = useState(300);
    const [vistaMes, setVistaMes] = useState('enero');
    const [tabla, setTabla] = useState();  
    const [actividadResaltada, setActividadResaltada] = useState(null);
    const [actividadResaltadaVertical, setActividadResaltadaVrtical] = useState(null);
    const [widthContenedorLlaves, setWidthContenedorLlaves] = useState('250px');

    const refs = retornarMesesDelAno().reduce((acc, mes) => ({ ...acc, [mes]: useRef(null) }), {});
    

    const tasks = useSelector(state => state.tasks); // Obtén el estado actual de tasks
    const dispatch = useDispatch(); // Obtén la función dispatch


    useEffect(() => {
        setGannt(retornarFechasAno());
    }, []);

    useEffect(() => {
        //alert(actividadResaltadaVertical)
    }, [actividadResaltadaVertical]);

    useEffect(() => {
        console.log('entra');
        setTabla(renderizarTabla())
    }, [gantt, modalIsOpen, modalContent, fechaInicio, value, vistaMes, actividadResaltada, actividadResaltadaVertical, widthContenedorLlaves]);

    const abrirModal = (contenido) => {
        console.log('abrirModal');
        console.log(contenido);
        setModalContent(contenido);
        setModalIsOpen(true);
    }

    const cerrarModal = () => {
        setModalIsOpen(false);
    }

    const handleChange = (event) => {
        setValue(event.target.value); 
    };

    function nuevaFechaInicio(fecha) {
        const meses = retornarMesesDelAno()
        const fechaObjeto = new Date(fecha);
        const nombreDelMes = meses[fechaObjeto.getUTCMonth()];
        const dia = fechaObjeto.getUTCDate();
        //alert(`${nombreDelMes}${dia}`)
        setFechaInicio(`${nombreDelMes}${dia}`)
    }

    function contenedorLlaves(){
        setWidthContenedorLlaves(widthContenedorLlaves === '250px' ? '10px' : '250px')
    }


    function soloLLaves(tasks){
        let elementosHijo = []
        for (let valor in tasks) {
            let llave = tasks[valor];
            elementosHijo.push(
                <div onClick={()=> reubiacionActividad(valor)} className="resaltar color1" style={{height: '50px', padding: '20px', margin: '10px', display: 'flex', width: '200px'}} key={valor}>
                    <p className="bordes" style={{width: 'max-content'}}>{valor}</p>
                </div>   
            )
        }
        return (
            <div className="color3 scroll" style={{display: 'block', borderTopLeftRadius: '0.3em', borderBottomLeftRadius: '0.3em', paddingLeft: '20px', paddingRight: '20px', marginRight: '10px', position: 'relative', width: widthContenedorLlaves}}>
                {elementosHijo}
                {<CreateSelect name={'meses'} value={vistaMes} options={retornarMesesDelAno()} event={(event) => mostrarAno(event.target.value)}/>}
                <button onClick={()=> contenedorLlaves()} className="botones" style={{position: 'absolute', top: '0', left: '70%', transform: 'translateX(70%)'}}>Botón</button>
            </div>
        )
        
    }

    function reubiacionActividad(valor){
        abrirModal(renderizarContenidoModal({[valor]: tasks[valor]}))    
    }

    function renderizarContenidoModal(changeTask){
        console.log('cambio');
        console.log(changeTask);
        return(
            Object.keys(changeTask).map((key) => (
                <div key={key}>
                    <p style={{color: 'white'}}>
                        actividad: {key}
                    </p>
                    {Object.entries(changeTask[key]).map(([subKey, value]) => {
                        if (typeof value === 'number') {
                            return (
                                <div key={subKey}>
                                    <p style={{color: 'white'}}>{subKey}:</p>
                                    <CreateSelect name={subKey} value={value} options={retornarDias(365)} event={(event) => cambiarActividadDias(key, subKey, event.target.value)}/>
                                </div>
                            );
                        } else {
                            return (
                                <div key={subKey}>
                                    <p style={{color: 'white'}}>{subKey}:</p>
                                    <CreateSelect name={subKey} value={value} options={retornarLlavesActividades(tasks)} event={(event) => cambiarActividadAnteriorObligatoria(key, subKey, event.target.value)}/>
                                </div>
                            );
                        }
                    })}
                </div>
            ))
        );
    }

    function cambiarActividadAnteriorObligatoria(actividad, subActividad, nuevaSubActividad){
        console.log(`actividad: ${actividad}, subActividad: ${subActividad}, nuevaSubActividad: ${nuevaSubActividad}`);
        let newTasks = {...tasks};
        newTasks[actividad][subActividad] = nuevaSubActividad;
        dispatch({ type: 'UPDATE_TASKS', payload: newTasks })
        abrirModal(renderizarContenidoModal({[actividad]: newTasks[actividad]}))
    }

    function cambiarActividadDias(actividad, subActividad, nuevaSubActividad){
        console.log(`actividad: ${actividad}, subActividad: ${subActividad}, nuevaSubActividad: ${nuevaSubActividad}`);
        let newTasks = {...tasks};
        newTasks[actividad][subActividad] = parseInt(nuevaSubActividad);
        dispatch({ type: 'UPDATE_TASKS', payload: newTasks })
        abrirModal(renderizarContenidoModal({[actividad]: newTasks[actividad]}))
    }

    function resaltarColumna(valor){
        setActividadResaltada(valor)
    }

    function resaltarFila(mes, dia){
        setActividadResaltadaVrtical(`${mes}${dia}`)
    }

    const mostrarAno = (mes) => {
        setVistaMes(mes)
        // Comprobar si la ref para el mes existe
        if(refs[mes] && refs[mes].current) {
          // Desplazar el contenedor hasta el elemento del mes
            refs[mes].current.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        } else {
            console.log(`No se encontró el mes: ${mes}`);
        }
    };


    function renderizarTabla(){
        let newDicc={}, diasPasados=gantt.indexOf(fechaInicio), currentMonth='';
            for(let valor in tasks){
                let diasDuracion=tasks[valor].diasDuracion,
                    accionAnteriorObligatoria=tasks[valor].accionAnteriorObligatoria,
                    diasDespuesDeInicioProyecto=tasks[valor].diasDespuesDeInicioProyecto;
                if(diasDespuesDeInicioProyecto!==undefined){
                diasPasados=parseInt(diasDespuesDeInicioProyecto)+gantt.indexOf(fechaInicio);
                } else if(accionAnteriorObligatoria !== 'inicio') {
                diasPasados = newDicc[accionAnteriorObligatoria].lastIndexOf('si') + 1;
                }
                let newArr=[];
                for(let u=0;u<gantt.length;u++){
                if(u>=diasPasados && u<diasPasados+diasDuracion){
                    newArr.push('si');
                } else {
                    newArr.push('no');
                }
                }
                newDicc[valor]=newArr;
            }
            if(Object.keys(tasks).length===0||gantt.length===0){
            return null;
            } else {
            let elementosPadre=[];
            for(let u=0;u<gantt.length;u++){
                let elementosHijo=[], soloGannt=gantt[u].split(/(\d+)/)[1], monthName=gantt[u].split(/(\d+)/)[0];
                for(let valor in tasks){
                if(gantt[u].length!==undefined){
                    let color='';
                    if(newDicc[valor][u]==='si'){
                    color=tasks[valor].diasDespuesDeInicioProyecto!==undefined?'color2':(tasks[valor].accionAnteriorObligatoria!==''||tasks[valor].accionAnteriorObligatoria==='inicio'?'color4':'color2');
                    } else {
                    color=''
                    }
                    elementosHijo.push(<div onClick={()=> resaltarColumna(valor)} className={`resaltar ${color === 'color4' || color === 'color2' ? color : actividadResaltadaVertical === `${monthName}${soloGannt}` || actividadResaltada === valor ? 'transparencia' : color} `} style={{height:'50px',marginTop:'10px',marginBottom:'10px',display:'flex',width:`${value}px`,transition:'width 0.5s ease'}} key={`${valor}-${u}`} title={` ${valor}, ${monthName} ${soloGannt} ${anoEnUso}`}></div>)
                }
                }
                if(monthName!==currentMonth){
                currentMonth=monthName;
                elementosPadre.push(<>
                                        <div key={`${u}`} style={{display:'block'}}>
                                            {elementosHijo}
                                            <p onClick={()=> resaltarFila(monthName, soloGannt)} className="color2 bordes" style={{marginBottom:'10px',padding:'10px',width:`${value}px`,transition:'width 0.5s ease'}}>{soloGannt}</p>
                                            <p className="color2 bordes" style={{marginBottom:'10px',padding:'10px',width:`${value}px`,transition:'width 0.5s ease'}} ref={refs[currentMonth]}>{currentMonth}</p>
                                        </div>
                                    </>)
                } else {
                elementosPadre.push(<div key={`${u}`} style={{display:'block'}}>
                                        {elementosHijo}
                                        <p onClick={()=> resaltarFila(monthName, soloGannt)} className="color1 bordes" style={{marginBottom:'10px',padding:'10px',width:`${value}px`,transition:'width 0.5s ease'}}>{soloGannt}</p>
                                    </div>)
                }
            }
            return  <>
                        <FechaSelector fechaInicial={anoEnUso+fechaInicio} onFechaChange={(nuevaFecha)=>nuevaFechaInicio(nuevaFecha)}/>
                        <div className="scroll" style={{height: '80vh', marginTop: '20px', marginBottom: '20px'}}>
                            <div className="color5 bordes " style={{display:'flex'}}>
                                {soloLLaves(tasks)}
                                <div className="scroll" style={{display:'flex',width:'80%'}}>{elementosPadre}</div>
                            </div>
                            <ModalUser isOpen={modalIsOpen} cerrarModal={cerrarModal} contenido={modalContent}/>
                        </div>
                        <input className="slider" type="range" min="20" max="300" value={value} onChange={handleChange}/>
                    </>
            }
    }
    
    return tabla
}