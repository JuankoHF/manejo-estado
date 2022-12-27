import React from "react";
import { Loading } from "./Loading";
import './UsesState/UsesState.css';

//const SECURITY_CODE = 'Paradigma';

function Obtener_LocalS () {
    if (!localStorage.getItem('codigo')){
        localStorage.setItem('codigo', "");
    } else {
        var SECURITY_CODE = localStorage.getItem('codigo');   
    }
    return SECURITY_CODE;
}
class ClassState extends React.Component {

    constructor(props) {     // declaracion del esta en clases
        super(props);        // para poder acceder y modificar el estado

        this.state = {
            value: '',
            error: false,
            good: false,
            loading: false,
            delete: false,
            confirmed: false,
        }
    }

    UNSAFE_componentWillMount() {
        console.log("UNSAFE_componentWillMount");
      }
    
      componentDidMount() {
        console.log("componentDidMount");
      }
    
      componentDidUpdate() {
        console.log("Update");
    
        if(!!this.state.loading) {
          setTimeout(() => {
            console.log("Doing the validation");
    
           if(Obtener_LocalS () === this.state.value) {

            this.setState( { loading: false } );
            this.setState( { confirmed: true } );


           } else {

            this.setState( {
                error: true,
                loading: false
            })

           }
    
            console.log("Finishing the validation");
          }, 1500);
        }
    }

    render() {

        if (!this.state.confirmed && !this.state.delete) {

            return (
                <div>
                    <h2 className="apart">Eliminar ClassState</h2>
    
                    <p>Por Favor, escriba el codigo de seguridad</p>
    
                    {this.state.error && (                             // validacion del estado de error
                    <p className="error">Error: el codigo es incorrecto</p>
                    )}
    
                    {this.state.good && (                             // validacion del estado de error
                    <p>Correcto... "despues vemos que hacemos aqui"...</p>
                    )}
    
                    {this.state.loading && (                             // validacion del estado de error
                    <Loading />
                    )}
    
                   <input 
                        placeholder="Código de seguridad"
                        value = {this.state.value}
                        onChange = {(event) => {
                            this.setState({value: event.target.value});
                        }}
                    /> 
                   <button className="control" onClick={() => {
                        this.setState({ loading: true});
                        this.setState({error: false});
                        this.setState({good: false});
                   }}> Comprobar </button>
                </div>
            );
        } else if (!this.state.delete && this.state.confirmed) {

            return (
                <React.Fragment>
                    <h2 className="apart">Eliminando ClassState</h2>
                    <p>¿Está seguro/a que desea eliminar ClassState?</p>
                    <button className="clear" onClick = {() => this.setState({delete: true})}>Sí, eliminar</button>
                    <button className="control" onClick = {() => {
                        this.setState({confirmed: false});
                        this.setState({delete: false});
                    }}>No, volver</button>
                </React.Fragment>
            );
        } else {

           return (
            <React.Fragment>
                <h2 className="apart">ClassState fue eliminado con éxito</h2>
                <button className="clear" onClick = {() => {
                    this.setState({confirmed: false});
                    this.setState({delete: false});
                    this.setState({value: ''});
                }}>Volver al estado inicial</button>
            </React.Fragment>
           );
        }
    }
}

export { ClassState};