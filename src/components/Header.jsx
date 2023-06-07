import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    isValidPresupuesto,
    setIsValidPresupuesto,
    setFiltro,
    setGastosFiltrados
}) => {
  return (
    <>
        {isValidPresupuesto ? (
            <header>
                <ControlPresupuesto 
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                setFiltro={setFiltro}
                setGastosFiltrados={setGastosFiltrados}
            />
            </header>            
        ): (
            <header className="nuevoPresupuesto">
                <NuevoPresupuesto 
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            </header>                       
        )}
    </>
        

        

        
    
  )
}

export default Header