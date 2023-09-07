// export const SET_CHECKINS = 'checkin/SET_CHECKINS';
export const ADD_CHECKIN = 'checkin/ADD_CHECKIN';
// export const UPDATE_CHECKIN = 'checkin/UPDATE_CHECKIN';
// export const DELETE_CHECKIN = 'checkin/DELETE_CHECKIN';

// export const setCheckins = ( checkins ) => ( {
//     type: SET_CHECKINS,
//     payload: checkins,
// } );

export const addCheckin = ( checkin ) => ( {
    type: ADD_CHECKIN,
    payload: checkin,
} );

// export const updateCheckin = ( checkin ) => ( {
//     type: UPDATE_CHECKIN,
//     payload: checkin,
// } );

// export const deleteCheckin = ( checkinId ) => ( {
//     type: DELETE_CHECKIN,
//     payload: checkinId,
// } );


//Thunks

// GET / api / habit / checkin
// or GET / api / habit / checkin ? topic =, <topic>

export const createCheckin = ( checkin ) => async ( dispatch ) => {
  //POST api / habit / checkin / <habit_id>
    console.log( "---------checkin PASSED INTO THUNK", checkin )
    // const { rname, cover_image, topic } = checkin

    const response = await fetch( `api/habit/checkin/ ${ habit_id }`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            // rname, cover_image, topic
        } )
    } );
    const data = await response.json();
    console.log( "-------POST CHECKIN THUNK FETCH DATA:", data )
    if ( response.ok ) {
        console.log( "-------POST CHECKIN RESPONSE OK", )
        console.log( "Checkins:   ", data.Checkins )
        dispatch( addCheckin( data ) );
        return data;
    }
};

//PUT /api/habit/checkin/<habit_id>

//DELETE /api/habit/checkin/<habit_id>

const initialState = {
    today: [],
    // all: [],
};

const checkinReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ADD_CHECKIN:
            return {
                ...state,
                checkins: [ ...state.today, action.payload ],
            };
        case SET_CHECKINS:
            return {
                ...state,
                checkins: action.payload,
            };

        default:
            return state;
    }
};

export default checkinReducer;
