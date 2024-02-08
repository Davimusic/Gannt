'use client'

import "./globals.css";
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Menu } from "@/components/menu";
import FechaSelector from "@/components/fechaSelector";
import Label from "@/components/label";
import { GanttTable } from "@/components/ganttTable";


//redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateInfo } from "@/funciones/redux/actions";


export function ApuMicro(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [anoEnUso, setAnoEnUso] = useState('2024');                                   //comodin
    //const [tasks, setTasks] = useState({'cooooo':{'diasDuracion':1, 'accionAnteriorObligatoria': 'inicio'}, 'azzul':{'diasDuracion':2, 'accionAnteriorObligatoria': 'cooooo'}, 'davis': {'diasDuracion':4, 'accionAnteriorObligatoria': 'azzul'},  'otro': {'diasDuracion':4, 'diasDespuesDeInicioProyecto': '4'}});
    const [changeTask, setChangeTask] = useState({});



    
    useEffect(() => {
        //alert(JSON.stringify(changeTask))
        /*console.log(changeTask);
        let newDicc = {}
        for (let llave in tasks) {
            if(llave === changeTask.nombreInicial){
                newDicc[changeTask.nuevoNombre] = `${changeTask.inicio}-${changeTask.final}`;
            } else {
                newDicc[llave] = tasks[llave];
            }
        }
        const newChangeTask = {'nombreInicial': changeTask.nuevoNombre, 'nuevoNombre': changeTask.nuevoNombre, 'inicio': changeTask.inicio, 'final': changeTask.final};
        if (JSON.stringify(newChangeTask) !== JSON.stringify(changeTask)) {
            setChangeTask(newChangeTask);
        }
        setTasks(newDicc);*/
    }, [changeTask]);


    return (
        <html>
            <head>
                <link
                href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Dancing+Script&family=Montserrat+Alternates:ital,wght@0,300;1,100&family=PT+Serif:ital@1&family=Playfair+Display:ital,wght@1,500&family=Rubik+Vinyl&display=swap"
                rel="stylesheet"
                />
                <link 
                rel="icon" 
                href="https://res.cloudinary.com/dplncudbq/image/upload/v1692559936/mias/icon_efg3sf.png" 
                type="image/x-icon">
                </link>
            </head>
            <body className="imagenFondo marco" style={{height: '100vh'}}>
                <Menu></Menu> 
                <div style={{ wordWrap: 'break-word'}}>
                    <GanttTable />
                </div>
            </body>
        </html>
    );
}