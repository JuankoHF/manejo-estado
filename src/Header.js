import React from "react";

function Header() {
    const [valueH, setValueH] = React.useState('')
    const [errorH, setErrorH] = React.useState(false)
   // const [deletedH, setDeletedH] = React.useState(false)
    const [change, setChange] = React.useState(false)

    if (!change) {

        return (
            <div>
                <h2 className="topheader">
                    Variantes para el manejo del estado con React
                </h2>
                <p>Por favor cree su código de seguridad</p>
               
                {errorH && (
                     <p className="error">DEBE INSERTAR ALGÚN CÓDIGO</p>
                )}
    
                <input placeholder="Insertar código" 
                    id="password"
                    value={valueH}
                    onChange = {(event) => {
                        setValueH(event.target.value);  // lo que haya escrito en el input
                    }}
                />
                <button className="but_save" onClick = {() => {
                    localStorage.setItem('codigo', valueH);
                    if (valueH === '') {
                        setErrorH(true);
                    } else {
                        setErrorH(false);
                        setChange(true);
                    }
                    setValueH('');
                }}>Guardar</button>
            </div>
        );
    } else {

        return (
            <React.Fragment>
                <h2 className="topheader">
                    Variantes para el manejo del estado con React
                </h2>
                 <p>¿Desea modificar su código de seguridad?</p>
                 <button  className="control" onClick = {() => {
                    setChange(false);
                    setErrorH(false);
                    setValueH('');
                 }}>Cambiar</button>
                 <button className="clear" onClick = {() => {
                    setChange(false);
                    setErrorH(false);
                    setValueH('');
                    localStorage.removeItem('codigo');
                 }}>Eliminar</button>
            </React.Fragment>
         );

    }

    
}
export { Header };