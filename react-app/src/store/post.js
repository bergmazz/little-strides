//Action Types
const SET_POSTS = 'post/SET_POSTS';
const ADD_POST = 'post/ADD_POST';
const DELETE_POST = 'post/DELETE_POST';
// // const UPDATE_POST = 'post/UPDATE_POST';
const SET_IMAGE = 'post/SET_IMAGE';

// Action Creators
export const setPosts = ( posts ) => ( {
    type: SET_POSTS,
    payload: posts,
} );

export const addPost = ( post ) => ( {
    type: ADD_POST,
    payload: post,
} );

export const deletePostById = ( postId ) => ( {
    type: DELETE_POST,
    payload: postId,
} );

export const setCapturedImage = ( capturedImage ) => ( {
    type: SET_IMAGE,
    payload: capturedImage,
} );



//Thunks
export const fetchPosts = () => async ( dispatch ) => {
    // GET / api / posts
    console.log( "-------IN GET POSTS THUNKAROONI" )
    const response = await fetch( '/api/posts', {
        headers: {
            "Content-Type": "application/json",
        },
    } );
    const data = await response.json();
    console.log( "-------GET POSTS DATA:", data )
    if ( response.ok ) {
        console.log( "-------GET POSTS RESPONSE OK", )
        console.log( "Posts:   ", data.posts )
        dispatch( setPosts( data.posts ) );
        return data;
    }
};

//POST / api / posts
export const post = ( content, image ) => async ( dispatch ) => {
    // console.log( "---------content PASSED INTO THUNK", content )
    // console.log( "---------image PASSED INTO THUNK", image )

    const response = await fetch( '/api/posts', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            content, image
        } )
    } );

    console.log( "-------POST POST THUNK REPSONSE:", response )

    const data = await response.json();
    console.log( "-------POST POST THUNK FETCH DATA:", data )
    if ( response.ok ) {
        console.log( "-------POST POST RESPONSE OK", )
        console.log( "Posts:   ", data.Posts )
        dispatch( addPost( data ) );
        return data;
    }
};

//DELETE / api / posts / <post_id>
export const deletePost = ( postId ) => async ( dispatch ) => {
    const response = await fetch( `/api/posts/${ postId }`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    } )
    if ( response.ok ) {
        dispatch( deletePostById( postId ) );
    };
}

//BONUS: PUT / api / posts / <post_id>

//no captured image thunk / api call - just to store url in state to pass from checkin confirmation page in checkin modal to post modal

// Reducer
const initialState = {
    all: [],
    capturedImage: null
};

const postReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SET_POSTS:
            return { ...state, all: [ ...action.payload ] };
        case ADD_POST:
            return { ...state, all: [ ...state.all, action.payload ] };
        case DELETE_POST:
            return {
                ...state,
                all: state.all.filter( ( post ) => post.id !== action.payload ),
            };
        case SET_IMAGE:
            return {
                ...state,
                capturedImage: action.payload,
            };
        default:
            return state;
    }
};

export default postReducer;
