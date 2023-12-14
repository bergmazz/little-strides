import React, { useState } from "react";
import { image1, image2, image3, image4, image5, image6 } from "../../RoutineFormModal/Covers";

function Step8 ( { coverImage, setCoverImage, routineName } ) {
    const images = [ image1, image2, image3, image4, image5, image6 ];
    const urls = [ "https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg", "https://images.pexels.com/photos/3900437/pexels-photo-3900437.jpeg", "https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg", "https://images.pexels.com/photos/4388593/pexels-photo-4388593.jpeg", "https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg", "https://images.pexels.com/photos/2309266/pexels-photo-2309266.jpeg" ]

    const initialSelectedIndex = urls.findIndex( ( url ) => url === coverImage );
    const [ selectedImage, setSelectedImage ] = useState(
        initialSelectedIndex !== -1 ? images[ initialSelectedIndex ] : null
    );

    const handleImageClick = ( image, imageUrl ) => {
        setCoverImage( imageUrl );
        setSelectedImage( image );
    };


    return (
        <div className="covers">
            <h2>Choose cover image</h2>
            <div className="covers-imgs">
                { images.map( ( imgSrc, index ) => (
                    <img
                        key={ index }
                        className={ `cover${ index + 1 } ${ selectedImage === imgSrc ? "selected" : ""
                            }` }
                        src={ imgSrc }
                        onClick={ () => handleImageClick( imgSrc, urls[ index ] ) }
                    />
                ) ) }
            </div>
        </div>
    );
}

export default Step8;



// OG coverImage urls

//     < img className = "cover1" src = { image1 } onClick = { () => { setCoverImage( "https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg" ) } } />
//         < img className = "cover2" src = { image2 } onClick = { () => { setCoverImage( "https://images.pexels.com/photos/3900437/pexels-photo-3900437.jpeg" ) } } />
//             < img className = "cover3" src = { image3 } onClick = { () => { setCoverImage( "https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg" ) } } />
//                 < img className = "cover4" src = { image4 } onClick = { () => { setCoverImage( "https://images.pexels.com/photos/4388593/pexels-photo-4388593.jpeg" ) } } />
//                     < img className = "cover5" src = { image5 } onClick = { () => { setCoverImage( "https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg" ) } } />
//                         < img className = "cover6" src = { image6 } onClick = { () => { setCoverImage( "https://images.pexels.com/photos/2309266/pexels-photo-2309266.jpeg" ) } } />
