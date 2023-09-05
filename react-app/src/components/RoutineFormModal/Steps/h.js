import React from "react";
import { image1, image2, image3, image4, image5, image6 } from "../Covers";

function Step8 ( { coverImage, setCoverImage } ) {

    const isValidURL = ( url ) => {
        const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
        return pattern.test( url );
    };

    // const validateImage = ( url, onSuccess, onError ) => {
    //     const img = new Image();

    //     img.onload = onSuccess;
    //     img.onerror = onError;

    //     img.src = url;
    // };

    return (
        <div className="covers">
            <h2>Choose cover image</h2>
            { !isValidURL( coverImage ) && coverImage.length > 5 && (
                <p>Or please provide a valid image URL starting with http:// or https:// and ending with png, jpg, jpeg, gif, or svg.</p>
            ) }
            {/* <img className="cover" src="" onClick={ () => { setCoverImage( "" ) } } /> */ }
            <div className="covers-imgs">
                <img className="cover1" src={ image1 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg" ) } } />
                <img className="cover2" src={ image2 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/3900437/pexels-photo-3900437.jpeg" ) } } />
                <img className="cover3" src={ image3 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg" ) } } />
                <img className="cover4" src={ image4 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/4388593/pexels-photo-4388593.jpeg" ) } } />
                <img className="cover5" src={ image5 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg" ) } } />
                <img className="cover6" src={ image6 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/2309266/pexels-photo-2309266.jpeg" ) } } />
            </div>
            <input
                type="text"
                value={ coverImage }
                onChange={ ( e ) => setCoverImage( e.target.value )
                }
            />

        </div>
    );
}

export default Step8;
