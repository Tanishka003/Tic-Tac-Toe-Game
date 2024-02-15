let boxes = document.querySelectorAll(".box");   // access each button of container
let resetbtn = document.querySelector("#reset-btn"); // 
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container ");
let msg = document.querySelector("#msg");

let playerO = true; // value for player
let count = 0; // checking the counting for game button 

const winningP = [ // patters of winning
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]; 
const resetGame = () => { //  logic for reset button using function
    playerO = true;  
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");  // hide winning msg before wining match
};
boxes.forEach((box) => {
    box.addEventListener("click",()=>{ // logic for playing according to game rule
        if(playerO) {
            box.innerText = "O";
            playerO = false;
        } else {
            box.innerText = "X";
            playerO = true;
        }
        box.disabled = true;
        count++;

        let iswinner = checkWinner(); // call function for winner

        if(count === 9 && !iswinner){
            gameDraw(); // game draw calling function
        }
    });
});

const gameDraw = () => {  // logic for draw game
    msg.innerText = `Game was a draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const disableBoxes = () => {  //disable other button when we find winner
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = () => { // enble game button for playing
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) => {  //logic for showing winner 
      msg.innerText = `Congratulations, Winner is ${winner}`;
      msgContainer.classList.remove("hide");
      disableBoxes();

};
const checkWinner = () => {    //check all win patterns for winning
    for(let pattern of winningP)
    {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

     if(pos1Val != "" && pos2Val != "" && pos3Val != "")
     {
        if(pos1Val === pos2Val && pos2Val === pos3Val){  //verifying condition for winner
            showWinner(pos1Val);
            return true;
        }
     }
    }
};

newGamebtn.addEventListener("click",resetGame);  // for new game
resetbtn.addEventListener("click", resetGame);   // for reset game