import FechaSelector from "./fechaSelector";
import { useState, useEffect, useRef } from "react";
import { ModalUser } from "./modal";
import { CreateSelect } from "./selects";
import { retornarDias } from "@/funciones/generales/retornarDias";
import { retornarLlavesActividades } from "@/funciones/generales/retornarLlavesActividades";
import { retornarFechasAno } from "@/funciones/generales/retornarFechasAno";
import { retornarMesesDelAno } from "@/funciones/generales/retornarMesesDelAno";
import { retornarLlavesProyectos } from "@/funciones/generales/retornarLlavesProyectos";
import Label from "@/components/label";
import Switch from "./swicht";
import '../app/globals.css'

import { useSelector, useDispatch } from 'react-redux';


export function GanttTable({}) {
    const [fechaInicio, setFechaInicio] = useState('enero1');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [gantt, setGannt] = useState([]);
    const [anoEnUso, setAnoEnUso] = useState('2024');
    const [value, setValue] = useState(300);
    const [alto, setAlto] = useState(50);
    const [vistaMes, setVistaMes] = useState('enero');
    const [tabla, setTabla] = useState(); 
    const [actividadResaltada, setActividadResaltada] = useState(null);
    const [actividadResaltadaVertical, setActividadResaltadaVrtical] = useState(null);
    const [widthContenedorLlaves, setWidthContenedorLlaves] = useState('250px');
    const [alerta, setAlerta] = useState('');
    const [llavePaso, setLlavePaso] = useState('');
    const [message, setMessage] = useState('');
    const [proyectoEnUso, setProyectoEnUso] = useState('');
    const [nuevoNombreProyecto, setNuevoNombreProyecto] = useState('');

    
    const refs = retornarMesesDelAno().reduce((acc, mes) => ({ ...acc, [mes]: useRef(null) }), {});
    

    const tasks = useSelector(state => state.tasks); 
    const llavesProyectos = useSelector(state => state.llavesProyectos); 
    const objeto = useSelector(state => state.objeto); 
    const dispatch = useDispatch(); 

    async function guardarProyecto() {
        const data = { 
            correo: 'davipianof@gmail.com', 
            info: tasks, 
            nombreProyecto: proyectoEnUso
        };
    
        try {
            const response = await fetch('/api/createDocument', {
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
            console.log(result);
            actualizarObjetoLlaves(result['gannt'])
        } catch (error) {
            console.error('Error obteniendo el documento:', error);
        }
    }

    async function obtenerTodosLosProyectos() {
        const data = { 
            correo: 'davipianof@gmail.com', 
        };
    
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
            console.log(result);
            actualizarObjetoLlaves(result[0]['gannt'])
        } catch (error) {
            console.error('Error obteniendo los proyectos:', error);
        }
    }
    
    useEffect(() => {
        Object.keys(objeto).length !== 0 && llavesProyectos.length !== 0 ? mostrarProyecto(llavesProyectos[0]) : null
    }, [objeto, llavesProyectos]);

    useEffect(() => {
        console.log(nuevoNombreProyecto);
    }, [ nuevoNombreProyecto]);
    

    useEffect(() => {
        obtenerTodosLosProyectos()
        setGannt(retornarFechasAno());
    }, []);


    useEffect(() => {
        alerta !== '' ? abrirModal(renderizarContenidoModal({[llavePaso]: tasks[llavePaso]})) : null
    }, [alerta, llavePaso]);

    useEffect(() => {
        console.log(message);
        if(message !== ''){
            if(message === 'Escribe el nombre del nuevo proyecto'){
                abrirModal(contenidoNuevoProyecto())
            } else {
                abrirModal(contenidoNuevaActividad())
            }
        }
    }, [message]);

    useEffect(() => {
        //alert(actividadResaltadaVertical)
    }, [actividadResaltadaVertical]);

    useEffect(() => {
        setTabla(renderizarTabla())
    }, [gantt, modalIsOpen, modalContent, fechaInicio, value, alto, vistaMes, actividadResaltada, actividadResaltadaVertical, tasks, widthContenedorLlaves]);

    function actualizarObjetoLlaves(obj){
        dispatch({ type: 'UPDATE_LLAVES_PROYECTOS', payload: retornarLlavesProyectos(obj) })
        dispatch({ type: 'UPDATE_OBJETO', payload: obj })
    }
    
    
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

    const handleChangeAlto = (event) => {
        setAlto(event.target.value); 
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
        setWidthContenedorLlaves(widthContenedorLlaves === '250px' ? '0px' : '250px')
    }

    function nuevaActividad(){
        setMessage('crear actividad con dias despues de inicio del proyecto')
        abrirModal(contenidoNuevaActividad())
    }

    function crearNuevaActividad(acc){
        let newTask = 'newTask'
        let newTasks = {...tasks}
    
        while(newTasks.hasOwnProperty(newTask)){
            newTask += '.'
        }

        if(acc === 'crear actividad con accion anterior obligatoria'){
            newTasks[newTask] = {'diasDuracion':1, 'accionAnteriorObligatoria': retornarLlavesActividades(tasks)[1]}
        } else if(acc === 'crear actividad con dias despues de inicio del proyecto'){
            newTasks[newTask] = {'diasDuracion':1, 'diasDespuesDeInicioProyecto': 1}
        } 
        dispatch({ type: 'UPDATE_TASKS', payload: newTasks })
        setMessage('')
        setModalIsOpen(false)
    }

    function contenidoNuevaActividad(){
        return (
            <div className="centrar" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '80%'}}>
                <p style={{color: 'white'}}>{message}</p>
                <Switch onToggle={(newValue) => {
                    if (newValue) {
                        setMessage('crear actividad con accion anterior obligatoria');
                    } else {
                        setMessage('crear actividad con dias despues de inicio del proyecto');
                    }
                }}/>
                <button onClick={()=> crearNuevaActividad(message)} className="botones" >Crear nueva actividad</button>
            </div>
        );
    }

    function NuevoProyecto(){
        setMessage('Escribe el nombre del nuevo proyecto')
        abrirModal(contenidoNuevoProyecto())
    }

    function crearNuevoProyecto(acc){
        console.log(acc);
        let bandera = 0
        for(let llave in objeto){
            console.log(llave);
            console.log(acc);
            llave === acc ? bandera = 1: null
        }

        if(bandera === 1){
            alert(`El nombre del proyecto ya existe, debe ser diferente!!!`)
            setMessage(`El nombre del proyecto ya existe, debe ser diferente!!!`)
            abrirModal(contenidoNuevoProyecto())
        }

        
        
        /*let newTask = acc
        let newTasks = {...llavesProyectos}
    
        while(newTasks.hasOwnProperty(newTask)){
            newTask += '.'
        }

        newTasks[newTask] = {'diasDuracion':1, 'diasDespuesDeInicioProyecto': 1}
        console.log(newTasks);*/
        //dispatch({ type: 'UPDATE_TASKS', payload: newTasks })
    }

    function contenidoNuevoProyecto(){
        return (
            <div className="centrar" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '80%'}}>
                <p style={{color: 'white'}}>{message}</p>
                <Label valor={nuevoNombreProyecto}  onValueChange={(newValue) => crearNuevoProyecto(newValue)}/>
                <button onClick={()=> crearNuevoProyecto(nuevoNombreProyecto)} className="botones" >Crear nuevo proyecto</button>
            </div>
        );
    }
    
    function borrarActividad(key){
        let newTasks = {...tasks}, newDicc = {}
        for (let valor in newTasks) {
            if(valor !== key){
                newDicc[valor] = newTasks[valor]
            } 
        }
        console.log(newDicc);
        dispatch({ type: 'UPDATE_TASKS', payload: newDicc })
        setModalIsOpen(false)
    }

    function soloLLaves(tasks){
        let elementosHijo = []
        for (let valor in tasks) {
            let llave = tasks[valor];
            elementosHijo.push(
                <div onClick={()=> reubiacionActividad(valor)} className="resaltar color1 scroll" style={{height:`${alto}px`, margin: '10px', display: 'flex', width: '200px', transition:'height 0.5s ease'}} key={valor}>
                    <p className="bordes" style={{width: '150px', height:`${alto}px`}}>{valor}</p>
                </div>   
            )
        }
        return (
            <div className="color3 scroll" style={{display: 'block', borderTopLeftRadius: '0.3em', borderBottomLeftRadius: '0.3em', paddingLeft: widthContenedorLlaves === '0px' ? '0px' : '20px', paddingRight: widthContenedorLlaves === '0px' ? '0px' : '20px', marginRight: '10px', position: 'relative', width: widthContenedorLlaves, transition:'width 0.5s ease'}}>
                {elementosHijo}
            </div>
        )
        
    }

    function reubiacionActividad(valor){
        setAlerta('')
        abrirModal(renderizarContenidoModal({[valor]: tasks[valor]}))    
    }

    function cambiarNombreActividad(key, newKey){
        if(key !== newKey ){
            console.log(newKey);
            let bandera = 0, newDicc = {}
            for (let task in tasks) {
                if (task === newKey) {
                    console.log(`Found task: ${task}`);
                    console.log(tasks[task]);
                    bandera = 1
                    setLlavePaso(newKey)
                    setAlerta(`La actividad ${newKey} ya existente, agrega o quita nuevos atributos al título!!!`)
                } 
            }

            if(bandera === 0){
                setAlerta('')
                //setLlavePaso('')
                for (let task in tasks) {
                    if (task === key) {
                        console.log(`Found task: ${task}`);
                        console.log(tasks[task]);
                        newDicc[newKey] = tasks[task]
                    } else {
                        newDicc[task] = tasks[task]
                    }
                }
                dispatch({ type: 'UPDATE_TASKS', payload: newDicc })
            }
        }
    }

    function renderizarContenidoModal(changeTask){
        return(
            <>
                {Object.keys(changeTask).map((key) => (
                    <div key={key} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '80%'}}>
                        <div className="centrar" style={{color: 'white', display: 'block'}}>
                            <div>
                                <h2 style={{color: 'red', paddingBottom: '20px'}}>{alerta}</h2>
                            </div>
                            <div>
                                <button onClick={()=> borrarActividad(key)} className="botones" >Borrar actividad</button>
                            </div>
                            <div>
                                Nombre actual: {key}
                            </div>
                            <div>
                                Nuevo nombre: {<Label valor={key}  onValueChange={(newValue) => cambiarNombreActividad(key, newValue)}/>}
                            </div>
                        </div>
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
                ))}
            </>
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

    function mostrarProyecto(llave){
        setProyectoEnUso(llave)
        dispatch({ type: 'UPDATE_TASKS', payload: objeto[llave]})
    }

    function renderizarTabla(){ 
        if(Object.keys(tasks).length === 0){
            return( <div className="miContenedor">
                        <div className="miCirculoGiratorio"></div>
                    </div>)
        }

        let newDicc={}, diasPasados=gantt.indexOf(fechaInicio), currentMonth='';
            for(let valor in tasks){
                let diasDuracion=tasks[valor].diasDuracion,
                    accionAnteriorObligatoria=tasks[valor].accionAnteriorObligatoria,
                    diasDespuesDeInicioProyecto=tasks[valor].diasDespuesDeInicioProyecto;
                if(diasDespuesDeInicioProyecto!==undefined){
                diasPasados=parseInt(diasDespuesDeInicioProyecto)+gantt.indexOf(fechaInicio);
                } else if(accionAnteriorObligatoria !== 'inicio') {
                    if(newDicc[accionAnteriorObligatoria] !== undefined){
                        diasPasados = newDicc[accionAnteriorObligatoria].lastIndexOf('si') + 1;
                    }
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
                    elementosHijo.push(<div onClick={()=> resaltarColumna(valor)} className={`resaltar ${color === 'color4' || color === 'color2' ? color : actividadResaltadaVertical === `${monthName}${soloGannt}` || actividadResaltada === valor ? 'transparencia' : color} `} style={{height:`${alto}px`,marginTop:'10px',marginBottom:'10px',display:'flex',width:`${value}px`,transition:'width 0.5s ease', transition:'height 0.5s ease'}} key={`${valor}-${u}`} title={` ${valor}, ${monthName} ${soloGannt} ${anoEnUso}`}>hihih</div>)
                }
                }
                if(monthName!==currentMonth){
                currentMonth=monthName;
                elementosPadre.push(<>
                                        <div key={`${u}`} style={{display:'block'}}>
                                            {elementosHijo}
                                            <p onClick={()=> resaltarFila(monthName, soloGannt)} className="color2 bordes" style={{height:`${alto}px`, marginBottom:'10px',padding:'10px',width:`${value}px`,transition:'width 0.5s ease'}}>{soloGannt}</p>
                                            <p className="color2 bordes" style={{ marginBottom:'10px',padding:'10px',width:`${value}px`,transition:'width 0.5s ease'}} ref={refs[currentMonth]}>{currentMonth}</p>
                                        </div>
                                    </>)
                } else {
                elementosPadre.push(<div key={`${u}`} style={{display:'block'}}>
                                        {elementosHijo}
                                        <p onClick={()=> resaltarFila(monthName, soloGannt)} className="color1 bordes" style={{height:`${alto}px`, marginBottom:'10px',padding:'10px',width:`${value}px`,transition:'width 0.5s ease'}}>{soloGannt}</p>
                                    </div>)
                }
            }
            return  <>
                        <div className="scroll disposicionBarra">
                            <div>
                                <CreateSelect name={'llavesproyecto'} value={proyectoEnUso} options={llavesProyectos} event={(event) => mostrarProyecto(event.target.value)}/>
                            </div>
                            <div>
                                <CreateSelect name={'meses'} value={vistaMes} options={retornarMesesDelAno()} event={(event) => mostrarAno(event.target.value)}/>
                            </div>
                            <div>
                                <FechaSelector fechaInicial={anoEnUso+fechaInicio} onFechaChange={(nuevaFecha)=>nuevaFechaInicio(nuevaFecha)}/>
                            </div>
                            <div>
                                <button onClick={()=> nuevaActividad()} className="botones" >nueva actividad</button>
                            </div>
                            <div>
                                <button onClick={()=> guardarProyecto()} className="botones" >Guardar</button>
                            </div>
                            <div>
                                <button onClick={()=> NuevoProyecto()} className="botones" >crear nuevo proyecto</button>
                            </div>    
                        </div>
                        <div className="scroll" style={{height: '60vh', marginTop: '20px', marginBottom: '20px'}}>
                            <button onClick={()=> contenedorLlaves()} className="botones sticky" style={{zIndex: '10000', display: modalIsOpen === false ? 'flex' : 'none'}} >Botón</button>
                            <div className="color5 bordes " style={{display:'flex'}}>
                                {soloLLaves(tasks)}
                                <div className="scroll" style={{display:'flex',width: widthContenedorLlaves === '0px' ? '99%' : '80%'}}>{elementosPadre}</div>
                            </div>
                            <ModalUser isOpen={modalIsOpen} cerrarModal={cerrarModal} contenido={modalContent} cerrar={()=> setModalIsOpen(false)}/>
                        </div>
                        <input className="slider" type="range" min="20" max="50" value={alto} onChange={handleChangeAlto}/>
                        <input className="slider" type="range" min="20" max="300" value={value} onChange={handleChange}/>
                        
                    </>
            }
    }
    
    return tabla
}