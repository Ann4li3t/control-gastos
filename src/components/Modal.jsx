import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0 ) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, []);

    const ocultarModal = () => {
        setAnimarModal(false)        
        setTimeout(() => {
            setGastoEditar({})
            setModal(false)
        }, 500);
    }

    const handleInputChange = (e) => {       
        e.preventDefault();
        const value = e.target.value;
        setCantidad(value);        
    } 

    const handleSubmit = (e) => {
        e.preventDefault()  
        let numeroParseado
        if (typeof cantidad === 'number') {
            numeroParseado = parseFloat(cantidad.toString().replace(",", "."));
        } else {
            numeroParseado = parseFloat(cantidad.replace(",", "."))  
        }
        
        if([ nombre, numeroParseado, categoria ].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return
        }          
                
        guardarGasto({nombre, cantidad: numeroParseado, categoria, id, fecha}) 
    } 
    
    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
            >
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre del gasto</label>

                    <input 
                        id="nombre"
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Monto del gasto</label>

                    <input 
                        id="cantidad"
                        type="number"
                        placeholder="Monto"
                        value={cantidad}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>

                    { <select
                        id="categoria"
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select> }
                </div>

                <div className='btn-submit'>
                    <input
                        type="submit"
                        value={gastoEditar.nombre ? 'Guardar Cambios ' : 'Añadir Gasto'}
                    />
                </div>
                

            </form>
        </div>
    )
}

export default Modal
