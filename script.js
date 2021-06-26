/*---------------- DOM ----------------*/
const time = document.getElementById("time");
const ground = document.getElementById("ground");
let places;



/*---------------- Global ----------------*/
// shake the data
const data = [
    "img/0.png", "img/1.png", "img/2.png", "img/3.png",
    "img/4.png", "img/5.png", "img/6.png", "img/7.png",
    "img/0.png", "img/1.png", "img/2.png", "img/3.png",
    "img/4.png", "img/5.png", "img/6.png", "img/7.png"
].sort(() => 0.5 -Math.random());

let clickedPlaces = [];
let donePlaces = [];




/*---------------- Function ----------------*/
// playing time
function playingTime() {
    let min = 0;
    let sec = 0;
    let playingTimer;

    // Interval
    playingTimer = setInterval(() => {
        // places & done places length same'===', than game over & clear Interval
        (places.length === donePlaces.length) && clearInterval(playingTimer);
        
        // second & minute LOGIC
        if (sec >= 59) { min += 1;    sec = 0; }
        else { sec += 1 };
        
        // show it in DOM
        time.innerText = `${min<10 ? '0'+min:min}:${sec<10 ? '0'+sec:sec}` 
    }, 1000);
};


// not match images
function notMatchImages() {
    // show clicked places for 1s, than make it normal;
    setTimeout(() => {
        // change bg color & bg images
        clickedPlaces.forEach(i => {
            places[i].style.backgroundColor = "#00000020";
            places[i].style.backgroundImage = '';
        });

        // clicked places willbe []
        clickedPlaces = [];
    }, 1000);
};


// match images
function matchImages() {
    // remove listener to clicked place
    places[clickedPlaces[0]].removeEventListener("click", clicked);
    places[clickedPlaces[1]].removeEventListener("click", clicked);

    // push clicked places to done placed
    donePlaces.push(places[clickedPlaces[0]]);
    donePlaces.push(places[clickedPlaces[1]]);

    // clicked places willbe []
    clickedPlaces = [];
};


// click event
function clicked(e) {
    // extract id
    let id = e.target.getAttribute("data-id");

    // change bg color & bg image
    places[id].style.backgroundColor = "#00000080";
    places[id].style.backgroundImage = `url(${data[id]})`;

    // push them to clickedPlaces
    clickedPlaces.push(id);

    // clicked places size===2, check check match occured
    if (clickedPlaces.length===2) {
        // if [0]===[1] images not match
        if (clickedPlaces[0] === clickedPlaces[1]) { notMatchImages() }

        // else if images match --> data[ID: clicked[0]] === data[ID: clicked[1]]
        else if (data[clickedPlaces[0]] === data[clickedPlaces[1]]) { matchImages() }
        
        // else images not match
        else { notMatchImages() };
    };
};


// hide images
function hideImages() {
    places.forEach(i => {
        // change bg color & bg image, make it normal
        i.style.backgroundColor = "#00000020";
        i.style.backgroundImage = '';
    });

    // add event listener to place
    places.forEach(i => i.addEventListener("click", clicked));

    // start playing Timer
    playingTime();
};


// show images
function showImages() {
    let id;
    places.forEach(i => {
        // extract id
        id = i.getAttribute("data-id");
        // change bg color & bg image
        i.style.backgroundColor = "#00000080";
        i.style.backgroundImage = `url(${data[id]})`;
    });
};


// create board
function createBoard() {
    // add places to DOM
    data.forEach((i, j) => {
        ground.innerHTML += `<div class="place" data-id="${j}"></div>`;
    });
    // add them to global places
    places = [...document.getElementsByClassName("place")];
};


// start game
function startGame() {
    // create board
    createBoard();
    // show images
    showImages();
    // hide images after 4s
    setTimeout(hideImages, 4000);
    // click event
};



/*---------------- Run ----------------*/
startGame();