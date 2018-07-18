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

let snakeState =[];
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

const changePlayFieldSpecs = (event) =>{
    console.log(event.srcElement.innerWidth,event.srcElement.innerHeight);
    let width = event.srcElement.innerWidth
}

// window.addEventListener('resize',changePlayFieldSpecs);
const pressedKeyDown = (event) => { presentEvent = 'keydown'; onKeyPressed(event)}
const releasedPressedKey = (event) => { presentEvent = 'keyup'; onKeyPressed(event)}
const addEventListenerForInputs=()=>{
    backgroundMain.addEventListener('keydown', pressedKeyDown);
    backgroundMain.addEventListener('keyup', releasedPressedKey);
}
addEventListenerForInputs();
const addEventListenerForRetryButton=()=>{
    retryButton.addEventListener('click', () => overlayDeactivate());

}
addEventListenerForRetryButton();
const onKeyPressed = (event) => {
    const eventKeyArray =['ArrowRight','ArrowLeft','ArrowUp','ArrowDown']
    event.preventDefault()
    if(eventKeyArray.includes(event.key)){
        // console.log(event);
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
            // console.log(presentEvent,previousEvent);
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
        // console.log(Head.style.left,Head.style.top);
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        // console.log(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (sleft + 20 > 1220) {
            clearInterval(timerIndex);
            removeListenersForInputs();
            Head.style.left = "1220px"; 
            sleft = 1220;
            overlay.setAttribute('style',`z-index:3`);
        } else {
            Head.style.left = sleft+20+"px";
            sleft=sleft+20;
            snakeState.unshift([Head.style.left, Head.style.top]);
            for (let i = 1; i < idCreator + 1; i++) {
                let identifier = "s" + i;
                let sElement = document.getElementById(identifier);
                sElement.style.left = snakeState[i][0]
                sElement.style.top = snakeState[i][1]
            }
        snakeState.pop();
        if(snakeState.length>2){
            if (arrayFilterCompare([Head.style.left, Head.style.top], snakeState.slice(1))){
                clearInterval(timerIndex);
                console.log('snake hit itself');
                removeListenersForInputs();
                overlay.setAttribute('style','z-index:3')
            }
        }
        }
    }, 75);

}
const OnLeftKeyPress = () => {
    direction = 'left';
    timerIndex = setInterval(() => {
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left,Food.style.top);
        if (sleft - 20 < 0) {
            clearInterval(timerIndex);
            removeListenersForInputs();
            Head.style.left = "0px"; 
            sleft = 0;
            overlay.setAttribute('style', `z-index:3`)
        } else {
            Head.style.left=sleft-20+"px";
            sleft=sleft - 20 ;
            snakeState.unshift([Head.style.left, Head.style.top]);
            for (let i = 1; i < idCreator + 1; i++) {
                let identifier = "s" + i;
                let sElement = document.getElementById(identifier);
                sElement.style.left = snakeState[i][0]
                sElement.style.top = snakeState[i][1]
            }
        snakeState.pop();
        if (snakeState.length > 2)
            if (arrayFilterCompare([Head.style.left, Head.style.top], snakeState.slice(1))) {
                clearInterval(timerIndex);
                console.log('snake hit itself');
                removeListenersForInputs();
                overlay.setAttribute('style', 'z-index:3')
            }
        console.log(snakeState);
        

        }
    }, 75);

}
const OnUpKeyPress = () => {
    direction = 'up';
    timerIndex = setInterval(() => {
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (stop - 20 < 0) {
            clearInterval(timerIndex);
            removeListenersForInputs();
            Head.setAttribute('style', `top:-20`);
            Head.style.top = "0px";
            stop = 0;
            overlay.setAttribute('style', `z-index:3`)
        } else {
            Head.style.top = stop-20 +"px"
            stop = stop-20;
            snakeState.unshift([Head.style.left, Head.style.top]);
            for (let i = 1; i < idCreator + 1; i++) {
                let identifier = "s" + i;
                let sElement = document.getElementById(identifier);
                sElement.style.left = snakeState[i][0]
                sElement.style.top = snakeState[i][1]
            }
        snakeState.pop();
        if (snakeState.length > 2)
            if (arrayFilterCompare([Head.style.left, Head.style.top], snakeState.slice(1))) {
                clearInterval(timerIndex);
                console.log('snake hit itself');
                removeListenersForInputs();
                overlay.setAttribute('style', 'z-index:3')
            }

        console.log(snakeState);
        }
    }, 75);
}
const OnDownKeyPress = () => {
    direction = 'down';
    timerIndex = setInterval(() => {
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (stop + 20 > 480) {
            clearInterval(timerIndex);
            removeListenersForInputs();
            Head.style.top="480px";
            stop=480;
            overlay.setAttribute('style', `z-index:3`)
        } else {
            Head.style.top = stop+20 +"px";
            stop =stop + 20;
            snakeState.unshift([Head.style.left, Head.style.top]);
            for (let i = 1; i < idCreator + 1; i++) {
                let identifier = "s" + i;
                let sElement = document.getElementById(identifier);
                sElement.style.left = snakeState[i][0]
                sElement.style.top = snakeState[i][1]
            }
        snakeState.pop();
        if (snakeState.length > 2)
            if (arrayFilterCompare([Head.style.left, Head.style.top], snakeState.slice(1))) {
                clearInterval(timerIndex);
                console.log('snake hit itself');
                removeListenersForInputs();
                overlay.setAttribute('style', 'z-index:3')
            }
        console.log(snakeState);
        }
    }, 75);
}
const snakeEatsFood = (sl, st, fl, ft) => {
    // console.log(sl,st,fl,ft);
        if (sl === fl && st === ft) {
            // console.log('snake ate the food');
            Food.style.left = 20*getRandomInt(62)+ "px";
            Food.style.top = 20*getRandomInt(25) + "px";
            // console.log(sl,st,fl, ft);
            for(let i=0;i<5;i++){
            createSnakeLinks();}
        }
}
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
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
            let sElement=document.getElementById(identifier);
            console.log(i,'removed');
            sElement.parentNode.removeChild(sElement);
        }
    }
    addEventListenerForInputs();
    idCreator=0;
    direction = '';
    presentEvent = '1';
    previousEvent = '';
    snakeState = [];
    // offsetCount=true;
    overlay.setAttribute('style', `z-index:-2`);
    // console.log(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
}
const createSnakeLinks =() => {
    let sBody = document.createElement('DIV');
    sBody.style.top= Head.style.top;
    sBody.style.left= Head.style.left;
    sBody.style.position= "absolute";
    sBody.style.zIndex="2";
    sBody.style.width= "20px";
    sBody.style.height= "20px";
    sBody.style.border= "2px solid blue";
    sBody.style.backgroundColor= "yellow";
    idCreator=idCreator + 1;
    sBody.id="s"+idCreator;

    playField.appendChild(sBody,null);
    snakeState.push([sBody.style.left,sBody.style.top]);
    console.log(idCreator)
    
}
const removeListenersForInputs =( )=>{

    backgroundMain.removeEventListener('keydown', pressedKeyDown);
    backgroundMain.removeEventListener('keyup', releasedPressedKey);

}
const arrayCompare =(arr1,arr2)=>{
    for(array of arr2){
        if(arr1[0]===arr2[0]&&arr1[1]===arr2[1]){
            return true;
        }
    }
    

}
const arrayCompareMap =(arr1,arr2)=>{
    arr2.map((e)=>{if(arr1[0]===e[0]&& arr1[1]===e[1]){return true} else{return false}})
    return arr2;
}
const arrayCompareReduce =(arr)=>{
    const reducer1 = (acc,cur)=> {acc+cur};
    return arr.reduce(reducer);
}

const arrayFilterCompare=(arr1,arr2)=>{
   if(arr2.filter(element=>arr1[0]===element[0]).filter(e=>arr1[1]===e[1]).length != 0){
       return true;
   }
   else{
       return false;
   }
}
// arrayCompareMap([Head.style.left,Head.style.top],snakeState.slice(1))
