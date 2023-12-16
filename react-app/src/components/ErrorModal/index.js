// import React, { useRef } from 'react';
import { useModal } from "../../context/Modal";
import "./error.css"

function ErrorModal ( { message } ) {
    // const ulRef = useRef()
    // const [ showMenu, setShowMenu ] = useState( false );
    const { closeModal } = useModal();

    // const closeMenu = ( e ) => {
    //     if ( !ulRef.current?.contains( e.target ) ) {
    //         setShowMenu( false );
    //     }
    // };

    return (
        <div className="error">
            <p>{ message }</p>
            <button onClick={ closeModal }>ok thanks bye</button>
        </div>
    )
}

export default ErrorModal
