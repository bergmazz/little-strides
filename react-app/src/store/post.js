//Action Types
const SET_POSTS = 'post/SET_POSTS';
// const ADD_POST = 'post/ADD_POST';
// const DELETE_POST = 'post/DELETE_POST';
// // const UPDATE_POST = 'post/UPDATE_POST';


// Action Creators
export const setPosts = ( posts ) => ( {
    type: SET_POSTS,
    payload: posts,
} );



//Thunks
export const fetchPosts = () => async ( dispatch ) => {
    // GET / api / posts
    const response = await fetch( '/api/posts/', {
        headers: {
            "Content-Type": "application/json",
        },
    } );
    const data = await response.json();
    // console.log( "-------GET POSTS DATA:", data )
    if ( response.ok ) {
        // console.log( "-------GET POSTS RESPONSE OK", )
        // console.log( "Posts:   ", data.Posts )
        dispatch( setPosts( data.Posts ) );
        return data;
    }
};

//POST / api / posts

//DELETE / api / posts / <post_id>

//BONUS: PUT / api / posts / <post_id>


// Reducer
const initialState = {
    all: [],
};

const postReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SET_POSTS:
            return { ...state, all: [ ...action.payload ] };
        // case ADD_POST:
        //     return { ...state, all: [ ...state.all, action.payload ] };
        // case DELETE_POST:
        //     return {
        //         ...state,
        //         all: state.all.filter( ( post ) => post.id !== action.payload ),
        //     };
        default:
            return state;
    }
};

export default postReducer;
