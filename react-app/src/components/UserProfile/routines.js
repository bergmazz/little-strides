// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRoutines } from '../../store/routine';

// const UserRoutines = () => {
//     const dispatch = useDispatch();
//     const currentUser = useSelector( state => state.session.user )
//     const routines = useSelector( state => state.routines )

//     useEffect( () => {
//         dispatch( fetchRoutines() );
//     }, [ dispatch ] );


//     return (
//         <div>
//             <h2>User Routines</h2>
//             { routines.map( ( routine ) => (
//                 <div key={ routine.id }>
//                     <h2>{ "Hello,  " }{ currentUser.username }</h2>
//                     <h3>{ routine.rname }</h3>
//                     <p>Cover Image: { routine.cover_image }</p>
//                     <p>Topic: { routine.topic }</p>
//                     <p>Habits: { routine.habits }</p>
//                 </div>
//             ) ) }
//         </div>
//     )
// };

// export default UserRoutines;
