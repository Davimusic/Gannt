import Modal from 'react-modal';

export function ModalUser({ isOpen, cerrarModal, contenido, cerrar }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrarModal}
            style={{
                content: {
                    background: 'black',
                    color: 'white',
                    borderRadius:' 0.7em',
                    
                }
            }}
        >
            {contenido}
            <button onClick={cerrar} className='botones'>cerrar</button>         
        </Modal>                
    );
}



