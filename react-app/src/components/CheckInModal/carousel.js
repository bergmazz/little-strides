let carousel = document.querySelector( '.carousel' );
let cards = carousel.querySelectorAll( '.checkin_cell' );
let cardCount; // cardCount set from cards-range input value
let selectedIndex = 0;
let cellWidth = carousel.offsetWidth;
let cellHeight = carousel.offsetHeight;
// let isHorizontal = true;
// let Fn = isHorizontal ? 'rotateY' : 'rotateX';
let radius, theta;
// console.log( cellWidth, cellHeight );

function rotateCarousel () {
    let angle = theta * selectedIndex * -1;
    carousel.style.transform = 'translateZ(' + -radius + 'px) ' +
        'rotateY' + '(' + angle + 'deg)';
}

// let prevButton = document.querySelector( '.previous-button' );
// prevButton.addEventListener( 'click', function () {
//     selectedIndex--;
//     rotateCarousel();
// } );

let nextButton = document.querySelector( '.next-button' );
nextButton.addEventListener( 'click', function () {
    selectedIndex++;
    rotateCarousel();
} );

// let cardsRange = document.querySelector( '.cards-range' );

// cardsRange.addEventListener( 'change', changeCarousel );
// cardsRange.addEventListener( 'input', changeCarousel );



function changeCarousel () {
    // cardCount = cardsRange.value;
    cardCount = habits.length
    theta = 360 / cardCount;
    let cellSize = cellWidth
    radius = Math.round( ( cellSize / 2 ) / Math.tan( Math.PI / cardCount ) );
    for ( let i = 0; i < cards.length; i++ ) {
        let cell = cards[ i ];
        if ( i < cardCount ) {
            // visible cell
            cell.style.opacity = 1;
            let cellAngle = theta * i;
            cell.style.transform = 'rotateY' + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
        } else {
            // hidden cell
            cell.style.opacity = 0;
            cell.style.transform = 'none';
        }
    }
    rotateCarousel();
}

// let orientationRadios = document.querySelectorAll( 'input[name="orientation"]' );
// ( function () {
//     for ( let i = 0; i < orientationRadios.length; i++ ) {
//         let radio = orientationRadios[ i ];
//         radio.addEventListener( 'change', onOrientationChange );
//     }
// } )();

// function onOrientationChange () {
//     let checkedRadio = document.querySelector( 'input[name="orientation"]:checked' );
//     isHorizontal = checkedRadio.value == 'horizontal';
//     'rotateY' = isHorizontal ? 'rotateY' : 'rotateX';
//     changeCarousel();
// }

// set initials
// onOrientationChange();
