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
    const buttonText = [ "alrighty", "ok thanks bye", "smell ya later", "whoops", "my bad", "moving onnn" ]
    const randomIndex = Math.floor( Math.random() * buttonText.length );

    return (
        <div className="error">
            <p>{ message }</p>
            <button onClick={ closeModal }>{ buttonText[ randomIndex ] }</button>
        </div>
    )
}

export default ErrorModal
