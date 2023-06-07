import { useState } from 'react'
import Mensaje from './Mensaje'
import Swal from 'sweetalert2'

const NuevoPresupuesto = ({
    presupuesto,
    setPresupuesto,
    isValidPresupuesto,
    setIsValidPresupuesto
}) => {

    const [mensaje, setMensaje] = useState('')
    const [valueInput, setValueInput] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault()        
        const numeroParseado = parseFloat(valueInput.replace(",", "."))
        if(!numeroParseado || numeroParseado < 0) {
            setMensaje('No es un presupuesto válido.')
            return
        }
        
        setPresupuesto(numeroParseado)
       
        setMensaje('')
        setIsValidPresupuesto(true)        
        localStorage.setItem('presupuesto', numeroParseado)
    }
 
    const handleInputChange = (e) => {
        const value = e.target.value
        setValueInput(value.replace('.', ','))  
    }
  
  return (
    <div className="añadir-presupuesto contenedor sombra">
        <h1>Gastómetro</h1>
        <p className='slogan'>Controla tus finanzas, simplifica tus gastos.</p>

        <div className="">
            <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label>Definir Presupuesto</label>

                <input 
                    className="nuevo-presupuesto"
                    type="number"
                    /* placeholder="Añade tu Presupuesto" */
                    value={valueInput}
                    onChange={handleInputChange}
                />
            </div>

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className='btn-submit'>
                <input type="submit" value="Añadir presupuesto" />
            </div>
        </form>
        </div>
       
       
    </div>
  )
}

export default NuevoPresupuesto