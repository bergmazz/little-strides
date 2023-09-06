export const SET_CHECKINS = 'checkin/SET_CHECKINS';
export const ADD_CHECKIN = 'checkin/ADD_CHECKIN';
export const UPDATE_CHECKIN = 'checkin/UPDATE_CHECKIN';
export const DELETE_CHECKIN = 'checkin/DELETE_CHECKIN';

export const setCheckins = ( checkins ) => ( {
    type: SET_CHECKINS,
    payload: checkins,
} );

export const addCheckin = ( checkin ) => ( {
    type: ADD_CHECKIN,
    payload: checkin,
} );

export const updateCheckin = ( checkin ) => ( {
    type: UPDATE_CHECKIN,
    payload: checkin,
} );

export const deleteCheckin = ( checkinId ) => ( {
    type: DELETE_CHECKIN,
    payload: checkinId,
} );


//Thunks

// GET / api / habit / checkin
// or GET / api / habit / checkin ? topic =, <topic>

//POST api / habit / checkin / <habit_id>

//PUT /api/habit/checkin/<habit_id>

//DELETE /api/habit/checkin/<habit_id>
