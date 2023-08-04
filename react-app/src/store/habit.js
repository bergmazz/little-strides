const USER_HABITS = 'habit/USER_HABITS';
const ALL_HABITS = 'routine/ALL_HABITS';
const SUGGESTED = 'routine/SUGGESTED';
const ADD_HABIT = 'routine/ADD_HABIT';
const UPDATE_HABIT = 'routine/UPDATE_HABIT';
const DELETE_HABIT = 'routine/DELETE_HABIT';

// Action Creators
export const setUserHabits = ( habits ) => ( {
    type: USER_HABITS,
    payload: habits,
} );

export const setAllHabits = ( habits ) => ( {
    type: ALL_HABITS,
    payload: habits,
} );

export const setSuggestedHabits = ( habits ) => ( {
    type: SUGGESTED,
    payload: habits,
} );

export const addHabit = ( habit ) => ( {
    type: ADD_HABIT,
    payload: habit,
} );

export const updateHabit = ( habit ) => ( {
    type: UPDATE_HABIT,
    payload: habit,
} );

export const removeHabit = ( habitId ) => ( {
    type: DELETE_HABIT,
    payload: habitId,
} );

// Thunks
export const currentUserHabits = () => async ( dispatch ) => {

};

export const allUserHabits = () => async ( dispatch ) => {

};

export const suggestedHabits = () => async ( dispatch ) => {

};

export const createHabit = ( habit ) => async ( dispatch ) => {

};

export const editHabit = ( habit ) => async ( dispatch ) => {

};

export const deleteHabit = ( habitId ) => async ( dispatch ) => {

};


// Reducer
const initialState = {
    userHabits: [],
    allHabits: [],
    suggestedHabits: [],
};

const habitReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case USER_HABITS:
            return { ...state, userHabits: [ ...action.payload ] };
        case ALL_HABITS:
            return { ...state, allHabits: [ ...action.payload ] };
        case SUGGESTED:
            return { ...state, suggestedHabits: [ ...action.payload ] };
        case ADD_HABIT:
            return { ...state, userHabits: [ ...state.userHabits, action.payload ] };
        case UPDATE_HABIT:
            return {
                ...state,
                userHabits: state.userHabits.map( ( habit ) =>
                    habit.id === action.payload.id ? action.payload : habit
                ),
            };
        case DELETE_HABIT:
            return {
                ...state,
                userHabits: state.userHabits.filter( ( habit ) => habit.id !== action.payload ),
            };
        default:
            return state;
    }
};

export default habitReducer;
