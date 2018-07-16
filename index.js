//initialisation of variables used in the 
let stop=20;
let sleft=20;
let fleft= 100;
let ftop= 100;
let overlayZIndex= -1;
let timerIndex = Number();
let direction = '';
let presentEvent='1';
let previousEvent='';
let pauseCount = 0;

//selecting the element for adding event listener
let playField = document.getElementsByClassName('playField')[0];
let overlay=document.getElementsByClassName('overlay')[0];
let retryButton=document.getElementsByClassName('retryButton')[0];
let Food=document.getElementsByClassName('Food')[0];
let Head=document.getElementsByClassName('Head')[0];
let backgroundMain = document.getElementsByClassName('backgroundMain')[0];
console.log(playField,overlay,retryButton,Food,Head,backgroundMain);

//adding event listener
// playField[0].addEventListener('keyPress',(event)=>onKeypressed(event));

backgroundMain.addEventListener('keydown', event => {presentEvent='keydown';onKeyPressed(event)});//onKeyPressed(event));
// backgroundMain.addEventListener('keypress', event => console.log('keypress'));// onKeyPressed(event));
backgroundMain.addEventListener('keyup', event => {presentEvent='keyup'; onKeyPressed(event)});// onKeyPressed(event));
retryButton.addEventListener('click',()=>overlayDeactivate());

//changing the attributes
// element.setAttribute("style", "background-color: red;");




const onKeyPressed = (event) => {
    event.preventDefault()
    console.log(event);
    event.preventDefault();
    if(previousEvent===presentEvent){
        //do nothing
    }
    else{
        clearInterval(timerIndex);

        if (event.key === 'ArrowRight') {
            clearInterval(timerIndex);
            OnRightKeyPress()
        }
        else if (event.key === 'ArrowLeft') {
            clearInterval(timerIndex);
            OnLeftKeyPress()
        }
        else if (event.key === 'ArrowUp') {
            clearInterval(timerIndex);
            OnUpKeyPress()
        }
        else if (event.key === 'ArrowDown') {
            clearInterval(timerIndex);
            OnDownKeyPress()
        }
        previousEvent = presentEvent;
        // console.log(Head.style.left, Head.style.top, Food.style.left, Food.style.top)
        console.log(presentEvent,previousEvent);
    }
}
const pauseP=() =>{
    if(pauseCount ===0){
    clearInterval(timerIndex);
    pauseCount = 1;}
    else{
        pauseCount=0;
        if(direction ==='right'){OnRightKeyPress()}
        else if (direction === 'left') {OnLeftKeyPress()}
        else if (direction === 'up') {OnUpKeyPress()}
        else if (direction === 'down') {OnDownKeyPress()}


    }
}

const OnRightKeyPress = () => {
    direction = 'right';
    timerIndex = setInterval(() => {
        didSnakeEat(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (sleft + 20 > 1220) {
            clearInterval(timerIndex);
            Head.style.left = "1240px"; 
            overlay.setAttribute('style',`z-index:3`);
        } else {
            // Head.setAttribute('style', `left:${sleft+20}+px`);
            Head.style.left = sleft+20+"px";
            // Head.style.setProperty("left", "500px");

            sleft=sleft+20
            // console.log('l',Head.style.left);
        }
    }, 75);

}
const OnLeftKeyPress = () => {
    direction = 'left';
    timerIndex = setInterval(() => {
        didSnakeEat(Head.style.left, Head.style.top, Food.style.left,Food.style.top);
        if (sleft - 20 < 0) {
            clearInterval(timerIndex);
            Head.style.left = "-20px"; 
            // Head.setAttribute('style', `left:-20`);
            overlay.setAttribute('style', `z-index:3`)
        } else {
            // Head.setAttribute('style', `left:${sleft - 20}`);
            Head.style.left=sleft-20+"px";
            sleft=sleft - 20 ;
            // console.log('l',Head.style.left);
        }
    }, 75);

}
const OnUpKeyPress = () => {
    direction = 'up';
    timerIndex = setInterval(() => {
        didSnakeEat(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (stop - 20 < 0) {
            clearInterval(timerIndex);
            Head.setAttribute('style', `top:-20`);
            Head.style.top = "-20px";
            overlay.setAttribute('style', `z-index:3`)
        } else {
            // Head.setAttribute('style', `top:${stop - 20}`);
            Head.style.top = stop-20 +"px"
            stop = stop-20;
            // console.log('t',Head.style.top)
        }
    }, 75);
}
const OnDownKeyPress = () => {
    direction = 'down';
    timerIndex = setInterval(() => {
        didSnakeEat(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (stop + 20 > 480) {
            clearInterval(timerIndex);
            // Head.setAttribute('style', `top:500`);
            Head.style.top="500px";
            overlay.setAttribute('style', `z-index:3`)
        } else {
            // Head.setAttribute('style', `top:${stop + 20}`);
            Head.style.top = stop+20 +"px";
            stop =stop + 20;
            // console.log('t',Head.style.top)
        }
    }, 75);
}


const didSnakeEat = (sl, st, fl, ft) => {
    if (sl === fl && st === ft) {
        console.log('snake ate the food');
        fl = 20 * getRandomInt(62)+"px";
        ft = 20 * getRandomInt(25)+"px";
        Food.style.left = fl;
        Food.style.top = ft;
        console.log(fl, ft);

    }
}
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
const snakeDiesOnEdges = () => {
    overlay.setAttribute('style', `z-index:3`);

}

const overlayDeactivate = () => {
    console.log('overlay Deactivate initiated');
    sleft=20;
    stop=20;
    Head.style.left="20px";
    Head.style.top="20px"
    fleft = 20 * getRandomInt(62);
    ftop = 20 * getRandomInt(25);
    Food.style.left = fleft +"px";
    Food.style.top= ftop+"px";
    overlay.setAttribute('style', `z-index:-2`);
    console.log('overlay deactivation done');
}