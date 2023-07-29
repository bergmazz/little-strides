// import React, { createContext, useState, useContext } from 'react';

// const ToastContext = React.createContext();

// export function ToastProvider ( { children } ) {

//     const [ toastContent, setToastContent ] = useState( null );

//     const showToast = ( content ) => {
//         setToastContent( content );
//         // timers,  auto-dismissal, etc
//     };

//     const hideToast = () => {
//         setToastContent( null );
//     };

//     const contextValue = {
//         toastContent,
//         showToast,
//         hideToast,
//     };

//     return (
//         <ToastContext.Provider value={ contextValue }>
//             { children }
//         </ToastContext.Provider>
//     );
// }

// export function useToast () {
//     return useContext( ToastContext );
// }
