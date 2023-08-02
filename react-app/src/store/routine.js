//Action Types
const SET_ROUTINES = 'routine/SET_ROUTINES';
const GET_ROUTINE = 'routine/GET_ROUTINE';
const ADD_ROUTINE = 'routine/ADD_ROUTINE';
// const UPDATE_ROUTINE = 'routine/UPDATE_ROUTINE';
// const DELETE_ROUTINE = 'routine/DELETE_ROUTINE';

//Action Creators
export const setRoutines = ( routines ) => ( {
    type: SET_ROUTINES,
    payload: routines,
} );

export const getRoutine = ( routine ) => ( {
    type: GET_ROUTINE,
    payload: routine
} );


export const addRoutine = ( routine ) => ( {
    type: ADD_ROUTINE,
    payload: routine,
} );

// export const updateRoutine = ( routine ) => ( {
//     type: UPDATE_ROUTINE,
//     payload: routine,
// } );

// export const deleteRoutine = ( routineId ) => ( {
//     type: DELETE_ROUTINE,
//     payload: routineId,
// } );

//Thunks
export const fetchRoutines = () => async ( dispatch ) => {
    const response = await fetch( '/api/routines/', {
        headers: {
            "Content-Type": "application/json",
        },
    } );
    const data = await response.json();
    // console.log( "-------GET USER ROUTINES DATA:", data )
    if ( response.ok ) {
        // console.log( "-------GET USER ROUTINES RESPONSE OK", )
        // console.log( "Routines:   ", data.Routines )
        dispatch( setRoutines( data.Routines ) );
        return data;
    }
};

export const createRoutine = ( routine ) => async ( dispatch ) => {
    // console.log( "---------routine PASSED INTO THUNK", routine )
    const { rname, cover_image, topic } = routine
    const response = await fetch( '/api/routines/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            rname, cover_image, topic
        } )
    } );
    const data = await response.json();
    // console.log( "-------GET USER ROUTINES THUNK FETCH DATA:", data )
    if ( response.ok ) {
        // console.log( "-------GET USER ROUTINES RESPONSE OK", )
        // console.log( "Routines:   ", data.Routines )
        dispatch( addRoutine( data ) );
        return data;
    }
};
// Reducer
const initialState = {
    routines: [],
};

const routineReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SET_ROUTINES:
            return { ...state, routines: [ ...action.payload ] };
        case GET_ROUTINE:
            return { ...state, routines: [ ...action.payload ] };
        case ADD_ROUTINE:
            return { ...state, routines: [ ...state.routines, action.payload ] };
        // case UPDATE_ROUTINE:
        //     return {
        //         ...state,
        //         routines: state.routines.map( ( routine ) =>
        //             routine.id === action.payload.id ? action.payload : routine
        //         ),
        //     };
        // case DELETE_ROUTINE:
        //     return {
        //         ...state,
        //         routines: state.routines.filter(
        //             ( routine ) => routine.id !== action.payload
        //         ),
            // };
        default:
            return state;
    }
};

export default routineReducer;
