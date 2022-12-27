import React from "react";
import './UsesState/UsesState.css'

//const SECURITY_CODE = 'Paradigma';

function Obtener_LocalS () {
    if (!localStorage.getItem('codigo')){
        localStorage.setItem('codigo', "");
    } else {
        var SECURITY_CODE = localStorage.getItem('codigo');   
    }
    return SECURITY_CODE;
}

function UseReducer({ name }) {
    const [state, dispatch ] = React.useReducer(reducer, initialState);
    
    React.useEffect(()=>{
        console.log('Empezando el efecto');
        if(state.loading){
            setTimeout(()=>{
                console.log("Haciendo la validación xd");
                if(state.value === Obtener_LocalS ()){
                    dispatch({
                        type: 'CONFIRM',
                    })
                }else{
                    dispatch({
                        type: 'ERROR'
                    });
                }
                console.log("Terminando la validación");
            },1500);
        }
        console.log('Terminando el efecto');
    },[state.loading]);


    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2 className="apart">Eliminar {name}</h2>
                <p>Por favor, escriba el código de seguridad.</p>
    
                {(state.error && !state.loading ) && (
                    <p className="error">El código es es incorrecto</p>
                )}
    
                {state.loading && (
                    <p>Cargando ...</p>
                )}
    
                <input 
                    type='text' 
                    placeholder='código de seguridad'
                    value={state.value}
                    onChange={(event)=>{
                        dispatch({
                            type:'WRITE',
                            payload: event.target.value,
                        })
                        // onWrite(event);
                    }
                    }
                />
                <button className="control"
                    onClick={()=>{
                        dispatch({
                            type: 'CHECK'
                        });
                    }}
                >Comprobar</button>
                <p className="footer">| Desarrollado por JNK-WedDEV |</p>
            </div>
        );
    }else if(state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <h2 className="apart">Eliminando {name}</h2>
                <p>¿Seguro/a que quieres eliminar {name}?</p>
                <button className="clear"
                    onClick={()=>{
                        dispatch({
                            type: 'DELETE'
                        });
                    }}
                >Si, eliminar</button>
                <button className="control"
                    onClick={()=>{
                        dispatch({
                            type:'RESET'
                        });
                    }}
                >No, volver</button>
                 <p className="footer">| Desarrollado por JNK-WedDEV |</p>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <h2 className="apart">{name} fue eliminado con éxito</h2>
                <button className="clear"
                    onClick={()=>{
                        dispatch({
                            type:'RESET'
                        });
                    }}
                >Recuperar UseReducer</button>
                 <p className="footer">| Desarrollado por JNK-WedDEV |</p>
            </React.Fragment>
        )
    }
}

const initialState = {
    value:'',
    error:false,
    loading:false,
    deleted: false,
    confirmed: false,
}

const reducerObject = (state, payload) => ({
    'CONFIRM':{ 
        ...state,
        error: false, 
        loading: false ,
        confirmed: true,
    },
    'ERROR': { 
        ...state,
        error: true, 
        loading: false 
    },
    'WRITE':{ 
        ...state,
        value: payload,
    },
    'CHECK':{ 
        ...state,
        loading: true 
    },
    'DELETE':{
        ...state,
        deleted: true,
    },
    'RESET':{
        ...state,
        confirmed: false,
        deleted: false,
        value:'',
    }
})

 const reducer = (state, action) => {
    return (reducerObject(state, action.payload)[action.type] || state);
};

export { UseReducer }