//initialisation of variables used in the 
let stop=20;
let sleft=20;
let timerIndex = Number();//variable tor setInterval
let direction = '';//direction of the present movement
let presentEvent='1';//keydown or keyup
let previousEvent='';//keydown or keyup
let idCreator = 0;//used to create new snake body elements 
let snakeState =[];//to store current snake position
let playWidth=0;//to define playwidth for better playing experience
let playHeight = 0; //to define playwidth for better playing experience
let snakeIncrement =5;//defines the growth of snake after eating food
let snakeSpeed =65;//defines the speed of snake the lower the faster
let scoreArr =[];//to store the scores
let widthLimit =0//used to calculate the random food
let heightLimit =0//used to calculate the random food
let Score =0//present score
let HighScore =0//high score

//selecting the element for adding event listener
//self-explanatory names.
const playField = document.getElementById('playField');
const overlay=document.getElementById('overlay');
const retryButton=document.getElementById('retryButton');
const Food=document.getElementById('Food');
const Head=document.getElementById('Head');
const backgroundMain = document.getElementById('backgroundMain');
const playyes = document.getElementById('playyes');
const playno = document.getElementById('playno');
const introBox =document.getElementById('introBox');
const intro = document.getElementById('intro');
const ss = document.getElementById('snakeSpeed');
const sg = document.getElementById('snakeGrowth'); 
const score = document.getElementById('score');
const highScore = document.getElementById('highScore');
const reason = document.getElementById('reason');
const achieve = document.getElementById('achievement');
const presentScore = document.getElementById('presentScore');

sg.addEventListener('change', () => snakeIncrement = Number(sg.value));
ss.addEventListener('change',()=>snakeSpeed = Number(ss.value));


//this is to fix a bug
//when program starts it doesn't get values from the css file.
//therefore the values are computed and them assigned to proper variables.
Head.style.left=window.getComputedStyle(Head,null).getPropertyValue('left');
Head.style.top = window.getComputedStyle(Head, null).getPropertyValue('top');
Food.style.left= window.getComputedStyle(Food, null).getPropertyValue('left');
Food.style.top= window.getComputedStyle(Food, null).getPropertyValue('top');
//credits
console.log('hi, harsha here. This is my first game using javascript. enjoy the game!!!')
//adding responsiveness to various displays
//change the game area based on the browser dimensions.
const oipSpecsAdjust = () =>{
    playWidth = widthLimit * 20;
    playHeight = heightLimit * 20;
    playField.style.width = playWidth + 'px';
    playField.style.height = playHeight + 'px';
    intro.style.width = playWidth + 'px';
    intro.style.height = playHeight + 'px';
    overlay.style.width = playWidth + 'px';
    overlay.style.height = playHeight + 'px';

}
const arrayFilterCompare = (arr1, arr2) => {
    if (arr2.filter(element => arr1[0] === element[0]).filter(e => arr1[1] === e[1]).length != 0) {
        return true;
    }
    else {
        return false;
    }
}
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}
const createRandomFood = () => {
    let a = 0;
    let b = 0;
    do {
        a = 20 * getRandomInt(widthLimit - 1);
        b = 20 * getRandomInt(heightLimit - 1);
    } while (arrayFilterCompare([a, b], snakeState.slice(1)));
    Food.style.left = a + "px";
    Food.style.top = b + "px";

}
const initialPlayAdjust =()=>{
    widthLimit = Math.floor(window.innerWidth / 20) - 5;
    heightLimit = Math.floor(window.innerHeight / 20) - 5;
    oipSpecsAdjust();
    createRandomFood()
    

}
initialPlayAdjust();

const changePlayFieldSpecs = (event) =>{
    widthLimit = (Math.floor(event.srcElement.innerWidth/20)-5);
    heightLimit = (Math.floor(event.srcElement.innerHeight/20)-5);
    oipSpecsAdjust();
    createRandomFood();
}

window.addEventListener('resize',changePlayFieldSpecs);

//creation of eventlisteners for control keys

const pressedKeyDown = (event) => { presentEvent = 'keydown'; onKeyPressed(event)};
const releasedPressedKey = (event) => { presentEvent = 'keyup'; onKeyPressed(event)};
const addEventListenerForInputs=()=>{
    backgroundMain.addEventListener('keydown', pressedKeyDown);
    backgroundMain.addEventListener('keyup', releasedPressedKey);
}
//adding the event listeners when player clicks 'PLAY'.
//hiding the intro dialogue.

playyes.addEventListener('click',()=>{
    intro.style.zIndex=-2;
    addEventListenerForInputs();
});

//adding event listner for retry button
const addEventListenerForRetryButton=()=>{
    retryButton.addEventListener('click', () => overlayDeactivate());

}
addEventListenerForRetryButton();

// logic for what to do when an arrow key is pressed.
const onKeyPressed = (event) => {
    const eventKeyArray =['ArrowRight','ArrowLeft','ArrowUp','ArrowDown']
    event.preventDefault()
    if(eventKeyArray.includes(event.key)){
        event.preventDefault();
        if(previousEvent!=presentEvent){
            if (event.key === 'ArrowRight') {
                if(direction!='left'){
                    clearInterval(timerIndex);
                    OnRightKeyPress()
                }
            }
            else if (event.key === 'ArrowLeft') {
                if(direction!='right'){
                    clearInterval(timerIndex);
                    OnLeftKeyPress()
                }
            }
            else if (event.key === 'ArrowUp') {
                if(direction!='down'){
                    clearInterval(timerIndex);
                    OnUpKeyPress()
                }
            }
            else if (event.key === 'ArrowDown') {
                if(direction!='up'){
                    clearInterval(timerIndex);
                    OnDownKeyPress()
                }
            }
            previousEvent = presentEvent;
        }
    }
}

const thingsToDoInPlayField=()=>{
    snakeState.unshift([Head.style.left, Head.style.top]);
    for (let i = 1; i < idCreator + 1; i++) {
        let identifier = "s" + i;
        let sElement = document.getElementById(identifier);
        sElement.style.left = snakeState[i][0]
        sElement.style.top = snakeState[i][1]
    }
    snakeState.pop();
    if (snakeState.length > 2) {
        if (arrayFilterCompare([Head.style.left, Head.style.top], snakeState.slice(1))) {
            clearInterval(timerIndex);
            removeListenersForInputs();
            overlay.style.zIndex = 3;
            achievement();
            reason.innerHTML = "snake ate it's own body";
        }
    }

}
const thingsToDoOnHittingWall = ()=>{
    removeListenersForInputs();
    clearInterval(timerIndex);
    overlay.style.zIndex = 3;
    reason.innerHTML = 'you have hit the wall!!!';
    achievement();
}

const OnRightKeyPress = () => {
    direction = 'right';
    timerIndex = setInterval(() => {
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (sleft + 20 > playWidth-20) {
            Head.style.left = (playWidth-20)+"px"; 
            sleft = playWidth-20;
            thingsToDoOnHittingWall();
        } else {
            Head.style.left = sleft+20+"px";
            sleft=sleft+20;
            thingsToDoInPlayField();
        }
    }, snakeSpeed);

}
const OnLeftKeyPress = () => {
    direction = 'left';
    timerIndex = setInterval(() => {
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left,Food.style.top);
        if (sleft - 20 < 0) {
            Head.style.left = "0px"; 
            sleft = 0;
            thingsToDoOnHittingWall();
        } else {
            Head.style.left=sleft-20+"px";
            sleft=sleft - 20 ;
            thingsToDoInPlayField();
        }
    }, snakeSpeed);

}
const OnUpKeyPress = () => {
    direction = 'up';
    timerIndex = setInterval(() => {
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (stop - 20 < 0) {
            Head.style.top = "0px";
            stop = 0;
            thingsToDoOnHittingWall();
        } else {
            Head.style.top = stop-20 +"px"
            stop = stop-20;
            thingsToDoInPlayField();
        }
    }, snakeSpeed);
}
const OnDownKeyPress = () => {
    direction = 'down';
    timerIndex = setInterval(() => {
        snakeEatsFood(Head.style.left, Head.style.top, Food.style.left, Food.style.top);
        if (stop + 20 > playHeight-20) {
            Head.style.top= (playHeight-20) +"px";
            stop=playHeight-20;
            thingsToDoOnHittingWall();            
        } else {
            Head.style.top = stop+20 +"px";
            stop =stop + 20;
            thingsToDoInPlayField();
        }
    }, snakeSpeed);
}

const snakeEatsFood = (sl, st, fl, ft) => {

        if (sl === fl && st === ft) {
           createRandomFood();
            for(let i=0;i<snakeIncrement;i++){
            createSnakeLinks();}
        }
}
const overlayDeactivate = () => {
    clearInterval(timerIndex);
    sleft=20;
    stop=20;
    Head.style.left="20px";
    Head.style.top="20px";
    createRandomFood();
    
    if (idCreator>0){
        for(let i=1;i<idCreator+1;i++){
            let identifier = "s"+i;
            let sElement=document.getElementById(identifier);
            sElement.parentNode.removeChild(sElement);
        }
    }
    addEventListenerForInputs();
    Score = 0;
    idCreator=0;
    direction = '';
    presentEvent = '1';
    previousEvent = '';
    snakeState = [];
    score.innerHTML="Score:   0";
    achieve.innerHTML="";
    overlay.style.zIndex = -5;
    initialPlayAdjust();
}
const createSnakeLinks =() => {
    let sBody = document.createElement('DIV');
    sBody.style.top= Head.style.top;
    sBody.style.left= Head.style.left;
    sBody.style.position= "absolute";
    sBody.style.zIndex="2";
    sBody.style.width= "20px";
    sBody.style.height= "20px";
    sBody.style.border = "1px solid rgb(39,40,34)";
    sBody.style.backgroundColor= "rgb(253,151,31)";
    idCreator=idCreator + 1;
    sBody.id="s"+idCreator;
    Score =Score+1;
    scoreArr.push(Score)
    score.innerHTML =`Score:  ${Score}`;
    highScore.innerHTML = `HighScore:  ${Math.max(...scoreArr)}`;
    playField.appendChild(sBody,null);
    snakeState.push([sBody.style.left,sBody.style.top]);
    
}
const removeListenersForInputs =( )=>{

    backgroundMain.removeEventListener('keydown', pressedKeyDown);
    backgroundMain.removeEventListener('keyup', releasedPressedKey);

}

const achievement = () =>{
    // console.log(scoreArr,Math.max(...scoreArr),Score);
    presentScore.innerHTML=`YOUR SCORE: ${Score}`;
    if(Math.max(...scoreArr)===Score){
        console.log('achieved');
        achieve.innerHTML = "NEW HIGH SCORE!!!"
    }
    let temp = Math.max(...scoreArr);
    scoreArr = [temp];
}
