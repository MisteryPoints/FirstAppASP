import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react"


const App = () => {
    const [tareas, setTareas] = useState([])
    const [descripcion, setDescripcion] = useState('')

    const mostrarTareas = async () => {
        const response = await fetch("api/tarea/Lista")
        if (response.ok) {
            const data = await response.json()
            setTareas(data)
        } else {
            console.log("Status Code " + response.status)
        }
    }

    //Metodo Convertir Fecha
    const formatDate = (date) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' }
        let fecha = new Date(date).toLocaleDateString('es-PE', options)
        let hora = new Date(date).toLocaleTimeString()
        return fecha + " | " + hora
    }

    //Metodo para Recuperar Formulario
    const guardarTarea = async (e) => {
        e.preventDefault()

        const response = await fetch('api/tarea/Guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({descripcion})
        })

        if (response.ok) {
            setDescripcion('')
            await mostrarTareas()
        }
        
    }

    //Metodo para Eliminar Tarea por su ID
    const cerrarTarea = async (id) => {  
        const response = await fetch('api/tarea/Cerrar/'+ id, {
            method: 'DELETE'
        })

        if (response.ok) { 
            await mostrarTareas()
        }

    }

    useEffect(() => {
        mostrarTareas()
    },[])


    return (
        <div className='container bg-dark p-4 vh-100'>
            <h2 className='text-white'>Lista de Tareas</h2>
            <div className='row'>
                <div className='col-sm-12'>
                    <form onSubmit={guardarTarea}>
                        <div className='input-group'>
                            <input type='text' className='form-control' placeholder='Ingrese la descripcion de la tarea' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                            <button className='btn btn-success' type='submit'>Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col-sm-12'>
                    <div className='list-group'>
                        {tareas.map(tarea => (
                            <div key={tarea.idTarea} className='list-group-item list-group-item-action'>
                                <h5 className='text-primary'>{tarea.descripcion}</h5>
                                <div className='d-flex justify-content-between'>
                                    <small className='text-muted'>{formatDate(tarea.fechaRegistro)}</small>
                                    <button onClick={() => cerrarTarea(tarea.idTarea)} className='btn btn-sm btn-outline-danger'>Cerrar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default App