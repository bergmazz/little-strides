let carousel = document.querySelector( '.carousel' );
let cards = carousel.querySelectorAll( '.checkin_step' );
let cardCount
let selectedIndex = 0;
let cellWidth = carousel.offsetWidth;
let cellHeight = carousel.offsetHeight;
let radius, theta;

function rotateCarousel () {
    let angle = theta * selectedIndex * -1;
    carousel.style.transform = 'translateZ(' + -radius + 'px) ' +
        'rotateY' + '(' + angle + 'deg)';
}


let nextButton = document.querySelector( '.next-button' );
nextButton.addEventListener( 'click', function () {
    selectedIndex++;
    rotateCarousel();
} );

function changeCarousel () {
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
