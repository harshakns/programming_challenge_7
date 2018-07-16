//initialisation of variables used in the 
let stop=20;
let sleft=20;
let overlayZIndex= -1;
let timerIndex = Number();
let direction = '';
let presentEvent='1';
let previousEvent='';
let pauseCount = 0;
let idCreator = 0;
//selecting the element for adding event listener
let playField = document.getElementsByClassName('playField')[0];
let overlay=document.getElementsByClassName('overlay')[0];
let retryButton=document.getElementsByClassName('retryButton')[0];
let Food=document.getElementById('Food');
let Head=document.getElementById('Head');
let backgroundMain = document.getElementsByClassName('backgroundMain')[0];

Head.style.left=window.getComputedStyle(Head,null).getPropertyValue('left');
Head.style.top = window.getComputedStyle(Head, null).getPropertyValue('top');
Food.style.left= window.getComputedStyle(Food, null).getPropertyValue('left');
Food.style.top= window.getComputedStyle(Food, null).getPropertyValue('top');



backgroundMain.addEventListener('keydown', event => {presentEvent='keydown';onKeyPressed(event)});
backgroundMain.addEventListener('keyup', event => {presentEvent='keyup'; onKeyPressed(event)});// 
retryButton.addEventListener('click',()=>overlayDeactivate());

console.log(Head.style.top,Head.style.left);



const onKeyPressed = (event) => {
    const eventKeyArray =['ArrowRight','ArrowLeft','ArrowUp','ArrowDown']
    event.preventDefault()
    if(eventKeyArray.includes(event.key)){
        console.log(event);
        event.preventDefault();
        if(previousEvent!=presentEvent){
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
        console.log(Head.style.left,Head.style.top);
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        console.log(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (sleft + 20 > 1220) {
            clearInterval(timerIndex);
            Head.style.left = "1240px"; 
            sleft = 1240;
            overlay.setAttribute('style',`z-index:3`);
        } else {
            Head.style.left = sleft+20+"px";
            sleft=sleft+20
        }
    }, 75);

}
const OnLeftKeyPress = () => {
    direction = 'left';
    timerIndex = setInterval(() => {
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left,Food.style.top);
        if (sleft - 20 < 0) {
            clearInterval(timerIndex);
            Head.style.left = "-20px"; 
            sleft = -20;
            overlay.setAttribute('style', `z-index:3`)
        } else {
            Head.style.left=sleft-20+"px";
            sleft=sleft - 20 ;

        }
    }, 75);

}
const OnUpKeyPress = () => {
    direction = 'up';
    timerIndex = setInterval(() => {
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (stop - 20 < 0) {
            clearInterval(timerIndex);
            Head.setAttribute('style', `top:-20`);
            Head.style.top = "-20px";
            stop = -20;
            overlay.setAttribute('style', `z-index:3`)
        } else {
            Head.style.top = stop-20 +"px"
            stop = stop-20;
        }
    }, 75);
}
const OnDownKeyPress = () => {
    direction = 'down';
    timerIndex = setInterval(() => {
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (stop + 20 > 480) {
            clearInterval(timerIndex);
            Head.style.top="500px";
            stop=500;
            overlay.setAttribute('style', `z-index:3`)
        } else {
            Head.style.top = stop+20 +"px";
            stop =stop + 20;
        }
    }, 75);
}


const snakeEatsFood = (sl, st, fl, ft) => {
    console.log(sl,st,fl,ft);
        if (sl === fl && st === ft) {
            console.log('snake ate the food');
            Food.style.left = 20*getRandomInt(62)+ "px";
            Food.style.top = 20*getRandomInt(25) + "px";
            console.log(sl,st,fl, ft);
            createSnakeLinks();
        }
}
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
const snakeDiesOnEdges = () => {
    overlay.setAttribute('style', `z-index:3`);
    clearInterval(timerIndex);

}

const overlayDeactivate = () => {
    console.log('overlay Deactivate initiated');
    clearInterval(timerIndex);
    sleft=20;
    stop=20;
    Head.style.left="20px";
    Head.style.top="20px";
    // fleft = 20 * getRandomInt(62);
    // ftop = 20 * getRandomInt(25);
    Food.style.left =20 * getRandomInt(62)+"px";
    Food.style.top = 20 * getRandomInt(25)+"px";
    
    if (idCreator>0){
        for(let i=1;i<idCreator+1;i++){
            let identifier = "s"+i;
            sElement=document.getElementById(identifier);
            console.log(i,'removed');
            sElement.parentNode.removeChild(sElement);
        }
    }
    idCreator=0;
    direction = '';
    presentEvent = '1';
    previousEvent = '';
    offsetCount=true;
    overlay.setAttribute('style', `z-index:-2`);
    console.log(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
}
const createSnakeBody = () => {}
//identify the end
//join the new body beginning to the end.


const createSnakeLinks =() => {
    let sBody = document.createElement('DIV');
    sBody.style.top= "40px";// to be added
    sBody.style.left= "20px";//to be added
    sBody.style.position= "absolute";
    sBody.style.zIndex="2";
    sBody.style.width= "20px";
    sBody.style.height= "20px";
    sBody.style.border= "1px solid blue";
    sBody.style.backgroundColor= "yellow";
    idCreator=idCreator + 1;
    sBody.id="s"+idCreator;
    // sBody.className='sBody';
    // sBody.id = "s"+idcreator;
    // let connector = idcreator -1;
    // idCreator = idCreator + 1;
    // sBody.snakeConnector = connector;
    // sBody.dataOwn = direction;
    // sBody.dataRelay = direction;
    // sBody.class = "snakeBody";
    playField.appendChild(sBody,null);
    
}
const linkSnakeBody = (element) =>{
    let predessor = document.getElementById("s"+connector);
    if(predessor.dataRelay === element.dataOwn){
        //do nothing
    }else{
        element.dataOwn = predessor.dataRelay
        //set the changes
    }}
