import React from "react";
import './UsesState.css';

//var SECURITY_CODE = '';

function Obtener_LocalS () {
    if (!localStorage.getItem('codigo')){
        localStorage.setItem('codigo', "");
    } else {
        var SECURITY_CODE = localStorage.getItem('codigo');   
    }
    return SECURITY_CODE;
}

function UsesState() {
    const [value, setValue] = React.useState('')
    const [error, setError] = React.useState(false) // declaracion de estado
    const [loading, setLoading] = React.useState(false)
    const [deleted, setDeleted] = React.useState(false)
    const [confirmed, setConfirmed] = React.useState(false)

    const onError = () => {   //otra manera de validar los estados (solo se llama a onError cuando haga falta)
        setLoading(false);
        setError(true);
    };

    React.useEffect(() => {

        setTimeout(() => {

            if (loading) {
                
                if(value === Obtener_LocalS ()) {
                    setLoading(false);
                    setConfirmed(true)
                }
                else{
                    onError();
                }
            }

        }, 1500);

    }, [loading]);

    if (!deleted && !confirmed) {

        return (
            <div>
                <h2 className="apart">Eliminar UsesState</h2>
    
                <p>Por Favor, escriba el codigo de seguridad</p>
    
                {error && (                             // validacion del estado de error
                    <p className="error">Error: el codigo es incorrecto</p>
                )}
    
                {loading && (                             // validacion del estado de error
                    <p>Cargando...</p>
                )}
    
                <input 
                    placeholder = "Código de seguridad"
                    value = {value}
                    onChange = {(event) => {
                        setValue(event.target.value);  // lo que haya escrito en el input
                    }}
                /> 
                <button className="control" onClick={() => {
                    setLoading(true);
                    setError(false);
                }}>Comprobar</button>
            </div>
        );
    } else if (!deleted && confirmed) {

        return (
            <React.Fragment>
                <h2 className="apart">Eliminando UsesState</h2>
                <p>¿Está seguro/a que desea eliminar UsesState?</p>
                <button className="clear" onClick = {() => setDeleted(true)}>Sí, eliminar</button>
                <button className="control" onClick = {() => {
                    setConfirmed(false);
                    setDeleted(false);
                }}>No, volver</button>
            </React.Fragment>
        );

    } else {

        return (
            <React.Fragment>
                <h2 className="apart">UsesState fue eliminado con éxito</h2>
                <button className="clear" onClick = {() => {
                    setConfirmed(false);
                    setDeleted(false);
                    setValue('');
                }}>Volver al estado inicial</button>
            </React.Fragment>
        );
    }
}

export { UsesState};