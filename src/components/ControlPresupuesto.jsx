import { useState, useEffect } from 'react'
import { formatearCantidad } from '../helpers'
import Swal from 'sweetalert2'

/* Propuesta del curso 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css" */

import Chart from "react-apexcharts"
/* https://apexcharts.com/ */

const ControlPresupuesto = ({
        gastos,
        setGastos, 
        presupuesto,
        setPresupuesto,
        setIsValidPresupuesto,
        setFiltro,
        setGastosFiltrados={setGastosFiltrados}
    }) => {

    const [porcentaje, setPorcentaje] = useState(0) 
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [series, setSeries] = useState([])

    const [decimalValue, setDecimalValue] = useState('');

   const windowWidth = window.innerWidth
  
    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto ) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        // Calcular el porcentaje gastado
        const nuevoPorcentaje = Number((( totalGastado / presupuesto  ) * 100).toFixed(2))

        // Calcular el porcentaje disponible
        const pDiponible = Number((( totalDisponible / presupuesto  ) * 100).toFixed(0));

        // Calcular el porcentaje gastado de cada categoria
        const gastosAhorro = gastos.filter( gasto => gasto.categoria === 'ahorro')
        const totalGastosAhorro = gastosAhorro.reduce( (total, gasto ) => gasto.cantidad + total, 0);
        const pAhorro = Number(((totalGastosAhorro / presupuesto  ) * 100).toFixed(0));
                
        const gastosComida = gastos.filter( gasto => gasto.categoria === 'comida')
        const totalGastosComida = gastosComida.reduce( (total, gasto ) => gasto.cantidad + total, 0);
        const pComida = Number((( totalGastosComida / presupuesto  ) * 100).toFixed(0));


        const gastosCasa = gastos.filter( gasto => gasto.categoria === 'casa')
        const totalGastosCasa = gastosCasa.reduce( (total, gasto ) => gasto.cantidad + total, 0);
        const pCasa = Number((( totalGastosCasa / presupuesto  ) * 100).toFixed(0));
        
        const gastosVarios = gastos.filter( gasto => gasto.categoria === 'gastos')
        const totalGastosVarios = gastosVarios.reduce( (total, gasto ) => gasto.cantidad + total, 0);
        const pVarios = Number((( totalGastosVarios / presupuesto  ) * 100).toFixed(0));

        const gastosOcio = gastos.filter( gasto => gasto.categoria === 'ocio')
        const totalGastosOcio = gastosOcio.reduce( (total, gasto ) => gasto.cantidad + total, 0);
        const pOcio = Number((( totalGastosOcio / presupuesto  ) * 100).toFixed(0));
        
        const gastosSalud = gastos.filter( gasto => gasto.categoria === 'salud')
        const totalGastosSalud = gastosSalud.reduce( (total, gasto ) => gasto.cantidad + total, 0);
        const pSalud = Number((( totalGastosSalud / presupuesto  ) * 100).toFixed(0));

        const gastosSuscripciones = gastos.filter( gasto => gasto.categoria === 'suscripciones')
        const totalGastosSuscripciones = gastosSuscripciones.reduce( (total, gasto ) => gasto.cantidad + total, 0);
        const pSuscripciones = Number((( totalGastosSuscripciones / presupuesto  ) * 100).toFixed(0));
    
        const series = [pAhorro, pComida, pCasa, pVarios, pOcio, pSalud, pSuscripciones, pDiponible]
        

        setSeries(series)
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);
    }, [gastos, presupuesto]) 

    const handleResetApp = () => {
        Swal.fire({
            title: '¿Deseas reiniciar presupuesto y gastos?',
            text: "Si reinicia presupuesto y gastos, no se podrán recuperar.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'btn btn-confirm-reset',
                cancelButton: 'btn btn-cancel'
            },
            buttonsStyling: false
        }).then((result) => {            
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Reiniciado!',
                    text: "Presupuesto y gastos reiniciados.",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Confirmado',
                    customClass: {
                        confirmButton: 'btn btn-confirm'
                    },
                    buttonsStyling: false
                }).then(() => { 
                    //reiniciar states
                    setGastos([])
                    setPresupuesto(0)
                    setIsValidPresupuesto(false)
                    setFiltro('')
                    setGastosFiltrados([])
                    localStorage.removeItem('presupuesto')
                })    
                
            }
        })
        
    }

    const handleBudgetsAdd = () => {
        
        Swal.fire({
            title: 'Añadir Presupuesto',
            html: '<input type="number" id="decimal-input" class="swal2-input">',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#ffffff',
            confirmButtonText: 'Agregar',
            customClass: {
                confirmButton: 'btn btn-confirm',
                cancelButton: 'btn btn-cancel'
            },
            buttonsStyling: false,
            preConfirm: () => {
                
                const input = document.getElementById('decimal-input');
                const value = input.value;
                if (!value.match(/^\d+(\.\d+)?$/)) {
                  Swal.showValidationMessage('Ingrese un númeroválido');
                  return false;
                }
            
                return value;
            },
        }).then((result) => {
            if (result.isConfirmed) {             

                const presupuestoAgregado = parseFloat(result.value)
                const resultPresupuesto = presupuestoAgregado + presupuesto
                const presupuestoActual = formatearCantidad(resultPresupuesto)
                setPresupuesto(resultPresupuesto)
                localStorage.setItem('presupuesto', resultPresupuesto)

                Swal.fire({
                    title: `Se ha agregado correctamente.`,
                    text: `Presupuesto actual: ${presupuestoActual}`,
                    icon: 'success',
                    confirmButtonText: 'Confirmado',
                    customClass: {
                        confirmButton: 'btn btn-confirm'
                    },
                    buttonsStyling: false
                })
            }
        });
    }

    const labels = ["Ahorro", "Comida", "Casa", "Varios", "Ocio", "Salud", "Susc", "Disponible"]
    
    const state = {   
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        },         
        series: series,
        options: {
            chart: {
                width: 380,
                type: 'donut',                
            },
            legend: {
                show: false,
            },            
            labels: labels,
            dataLabels: {
                enabled: false
              },
            theme: {
                monochrome: {
                  enabled: true,
                  color: '#3b82f6',
                  mode: 'light',
                }
              }, 
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    }                
                }
            }],
            plotOptions: {
                pie: {
                    startAngle: 0,
                    endAngle: 360,
                    expandOnClick: true,
                    offsetX: 0,
                    offsetY: 0,
                    customScale: 1,
                    dataLabels: {
                        offset: 0,
                        minAngleToShowLabel: 10
                    }, 
                    donut: {
                        size: '85%',
                        background: 'transparent',
                        labels: {
                            show: true,                      
                            value: {
                                show: true,
                                fontSize: '5rem',
                                fontSize: `${windowWidth < 480 ? '2.8rem' : '5rem' }`,
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                color: '#333',
                                offsetY: `${windowWidth < 480 ? 4 : 25 }`,
                                formatter: function (val) {
                                    return val
                                }
                            },
                            total: {
                                show: true,
                                showAlways: true,
                                label: 'Gastado',
                                fontSize: '1.5rem',
                                fontFamily: 'Poppins',
                                fontWeight: 300,
                                color: '#64748b',
                                formatter: function (w) {
                                    const result = w.globals.seriesTotals.slice(0, -1).reduce((total, porciento) => total + porciento, 0)
                                    return `${result} %`
                                }                    
                            }
                        }
                    },      
                }
            },            
            tooltip: {
                enabled: true,        
                custom: function({ series, seriesIndex, dataPointIndex, w }) {
                    return (
                      '<div class="arrow_box">' +               
                            "<span>" 
                                + w.globals.labels[seriesIndex] +": " + series[seriesIndex] + " %"+
                            "</span>" +
                      "</div>"
                    );
                }
            }            
        }
    }    

    return (
        <div className="contenedor sombra ">
            <h1>Gastómetro</h1>
            <p className='slogan'>Controla tus finanzas, simplifica tus gastos.</p>
            <div className='control-gastos contenedor-presupuesto dos-columnas'>
                <div className='chart-donut'>
                    <Chart 
                        options={state.options} 
                        series={state.series} 
                        type="donut" 
                        width={310} 
                    />          
                </div>

                <div className="contenido-presupuesto">
                    <div className='contenedor-presupuesto dos-columnas'>
                        <p>
                            <span>Presupuesto </span>
                        </p>
                        <p>
                            {formatearCantidad(presupuesto)}
                        </p>
                    </div>
                    <div className='contenedor-presupuesto dos-columnas'>
                        <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                            <span>Disponible </span>
                        </p>
                        <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                            {formatearCantidad(disponible)}
                        </p>
                    </div>
                    <div className='contenedor-presupuesto dos-columnas'>
                        <p>
                            <span>Gastado </span>
                        </p>
                        <p>
                            {formatearCantidad(gastado)}
                        </p>
                    </div>            

                    <div className='botones contenedor-presupuesto  dos-columnas'>
                        <button
                            className="agregar-presupuesto"
                            type="button"
                            onClick={handleBudgetsAdd}
                        >
                            Agregar
                        </button>

                        <button
                            className="reset-app"
                            type="button"
                            onClick={handleResetApp}
                        >
                            Resetear
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ControlPresupuesto
