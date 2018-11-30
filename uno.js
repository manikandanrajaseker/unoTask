var numbersInCard=["0","1","2","3","4","5","6","7","8","9","p2","p4","W","R","S"];
var colorsForCards=["blue","yellow","red","green","black"];
var playerCardCount=0;
var computerCardCount=0;
var computerCardDraw="";
var currentOpenCardNumber="";
var currentOpenCardColor="";
var changedColor="";
var gameTurn="player";
var wIndex="";
var playerName="";
var drawnCard="";
var computerScore=0;
var playerScore=0;
var unoClick=false;
var sec = 60;
var min =1;
function startGame(){
    playerName=(document.getElementById('playerName').value).trim();
    if(playerName.length>2){
        execute();
    document.getElementById('entryForm').innerHTML="";
    document.getElementById('gameView').style.display='block';
    document.getElementById("computerCardView").style.pointerEvents = 'none';
    document.getElementById("SkipYourTurn").style.pointerEvents = 'none';
    document.getElementById("droppedCard").style.pointerEvents = 'none';
    onTimer();
}else{
    alert("Name should contain atleast more then 2 letters");
}

}

function drawCard(byWhom){
var randamNumber = numbersInCard[(Math.random() * numbersInCard.length) | 0];
var randColor = colorsForCards[(Math.random() * colorsForCards.length-1) | 0];
var changedRand;
if(randamNumber=="p4"){
    changedRand="+4";
    randColor = colorsForCards[(Math.random() * colorsForCards.length) | 0];
}else if(randamNumber=="p2"){
    changedRand="+2";
}else if(randamNumber=="W"){
    changedRand=randamNumber;
    randColor = "black";
}else{
    changedRand=randamNumber;
}
if(byWhom=="playerCardView"){
    var variableFunctionCall="removeCardFromView('playerCard"+playerCardCount+"','"+changedRand+"','"+randColor+"')";
    document.getElementById('playerCardView').innerHTML+='<div class="card num-'+randamNumber+' '+randColor+'" id="playerCard'+playerCardCount+'"   onclick="'+variableFunctionCall+'"><span class="inner"><span class="mark">'+changedRand+'</span></span></div>';
playerCardCount++;
}else if(byWhom=="computerCardView"){
    var variableFunctionCall="removeCardFromView('computerCard"+computerCardCount+"','"+changedRand+"','"+randColor+"')";
    document.getElementById('computerCardView').innerHTML+='<div class="card num-'+randamNumber+' '+randColor+'    '+computerCardCount+' com" id="computerCard'+computerCardCount+'"   alt="'+variableFunctionCall+'" style="font-size=0;"><img src="download.png" width=100% height=100%><span class="inner" style="width=0;font-size=0;"><span class="mark"style="width:0;padding: 0;">'+changedRand+'</span></span></div>';
    computerCardCount++;
}
else if(byWhom=="openCard"){
    randColor = colorsForCards[(Math.random() * colorsForCards.length-1) | 0];
    currentOpenCardNumber=randamNumber;
    currentOpenCardColor=randColor;
document.getElementById('droppedCard').innerHTML='<div class="card num-'+randamNumber+' '+randColor+'"><span class="inner"><span class="mark">'+changedRand+'</span></span></div>';
}
 if(byWhom=="computerCardView"){
     if(computerCardCount>7){
        if(drawnCard!="+2"||drawnCard!="+4")
         if(randamNumber==currentOpenCardNumber||randColor==currentOpenCardColor||randColor=="black"){
             gameTurn="computer";
             document.getElementById("playerCardView").style.pointerEvents = 'none';
         }else{
            gameTurn="player";
            document.getElementById("playerCardView").style.pointerEvents = 'auto';
         }
     }
 }else if(byWhom=="playerCardView"){
     
    if(playerCardCount>7){
        if(drawCard!="+4"||drawnCard!="+2"||drawCard!="p4"||drawnCard!="p2")
        if(randamNumber==currentOpenCardNumber||randColor==currentOpenCardColor||randColor=="black"){
            gameTurn="player";
            document.getElementById("playerCardView").style.pointerEvents = 'auto';
            document.getElementById("SkipYourTurn").style.pointerEvents = 'auto';
        }else{
           gameTurn="computer";
           document.getElementById("playerCardView").style.pointerEvents = 'nome';
           setTimeout(computerMove,3000);
        }
    }
 }
}

function computerMove(){
    if(gameTurn=="computer"){
    var count =document.getElementById("computerCardView").childElementCount;
    if(count==2){
        alert("computer has said UNO");
    }
    var loopcount=0;
    for(var i=1;i<=count;i++){
        computerCurrentCardNumber=document.getElementById("computerCardView").childNodes[i].className.slice(9,11);
        computerCurrentCardColor=document.getElementById("computerCardView").childNodes[i].className.slice(11,18);
        computerCurrentCardId=document.getElementsByClassName(document.getElementById("computerCardView").childNodes[i].className)[0].id;
        if(computerCurrentCardNumber.trim()==currentOpenCardNumber.trim()||computerCurrentCardColor.trim()==currentOpenCardColor||computerCurrentCardColor.trim()=="black"){
            setTimeout(removeCardFromView(computerCurrentCardId.trim(),computerCurrentCardNumber.trim(),computerCurrentCardColor.trim()), 10000);
            i=count+1;
            break;
        }
        loopcount++;
    }
    if(loopcount==count){
        drawCard("computerCardView");
    }}
gameTurn="player";
document.getElementById("playerCardView").style.pointerEvents = 'auto';
}

function execute(){
    drawCard("openCard");
    if(playerCardCount==0){
for(var i=0;i<7;i++){
    drawCard("playerCardView");
}
    }
    if(computerCardCount==0){
        for(var i=0;i<7;i++){
            drawCard("computerCardView");
        }
    }
}
function removeCardFromView(index,number,color){
    if(currentOpenCardNumber=="p2"){
        currentOpenCardNumber="+2"
    }else if(currentOpenCardNumber=="p4"){
        currentOpenCardNumber="+4";
    }else if(number=="p2"){
        number="+2"
    }else if(number=="p4"){
        number="+4";
    }
    if((currentOpenCardColor==color||currentOpenCardNumber==number||color=="black")&&document.getElementById("playerCardView").childElementCount!=0&&document.getElementById("computerCardView").childElementCount!=0){
        drawnCard=number;
        if(color=="black"){
            wIndex=number;
            if(gameTurn=="player"){
            document.getElementById('gameView').style.display='none';
            document.getElementById('entryForm').style.display='block';
            document.getElementById('entryForm').style.zIndex='9';
            document.getElementById('entryForm').innerHTML="<div class='entryForm' style='justify-content: center;align-items: center;padding-left: 80px;padding-top: 50px;'> Choose The Color:<br><select id='colorSelected'style='margin-left: 30px;margin-top: 30px;'><option value='red' style='background:red;'>Red</option><option value='green' style='background:green;'>Green</option><option value='yellow' style='background:yellow;'>Yellow</option><option value='blue' style='background:blue;'>Blue</option></select> <br><button style='margin-left: 32px;'onClick='changeDrawColor()'>Change</button></div>";
            }else{
                currentOpenCardColor=colorsForCards[(Math.random() * colorsForCards.length-1) | 0];
            }
            var remove=document.getElementById(index);
            remove.parentNode.removeChild(remove);
            droppedCardView(number,currentOpenCardColor);
            }else{            
            droppedCardView(number,color);
            var remove=document.getElementById(index);
            remove.parentNode.removeChild(remove);
            }
            if(number=="+2"){
                if(gameTurn=="computer"){
                    drawCard("playerCardView");
                    drawCard("playerCardView");
                }
                else{ 
                    drawCard("computerCardView");
                    drawCard("computerCardView");
                }
                
            }else if(number=="+4"){
                if(gameTurn=="computer"){
                    drawCard("playerCardView");
                    drawCard("playerCardView");
                    drawCard("playerCardView");
                    drawCard("playerCardView");
                }
                else{
                    drawCard("computerCardView");
                    drawCard("computerCardView");
                    drawCard("computerCardView");
                    drawCard("computerCardView");
                }
            }
        if(number=="S"||number=="R"||number=="+2"||number=="+4"){
                if(gameTurn=="computer"){
                    gameTurn="computer";
                    document.getElementById("playerCardView").style.pointerEvents = 'none';
                    setTimeout(computerMove,3000);
                }else{
                    gameTurn="player";
                    document.getElementById("playerCardView").style.pointerEvents = 'auto';
                }
            }else if(number!="W"){
                if(gameTurn=="computer"){
                    gameTurn="player";
                    document.getElementById("playerCardView").style.pointerEvents = 'auto';
                }else{
                    gameTurn="computer";
                    document.getElementById("playerCardView").style.pointerEvents = 'none';
                    setTimeout(computerMove,3000);
        }
        }else if(number=="W"&&gameTurn=="computer"){
                    document.getElementById("playerCardView").style.pointerEvents = 'auto';
                    gameTurn="player";
        }
        if(document.getElementById("playerCardView").childElementCount==1&&unoClick!=true&&gameTurn=="player"){
            drawCard("playerCardView");
            drawCard("playerCardView");
        }
        
        if(document.getElementById("playerCardView").childElementCount==0){
    calculateScore();  
    document.getElementById('entryForm').style.display="block";         
    document.getElementById('gameView').style.display="none";       
    document.getElementById('entryForm').innerHTML='<div id="entryForm" style="display: block;border-color: transparent;"><div class="entryForm" style=" justify-content: center;border: none;align-items: center; width: 80%;top: 50px;left: 10%;height: 60%;"><div class="headdingWinner" style="width: 100%;height: 25%;font-size: 45px;text-align: center;padding: 15px;background: #174075;color: white;border-top-left-radius: 5px;border-top-right-radius: 5px;"><b>UNO WINNER</b></div><div class="winnerName" style="width: 100%;height: 20%;font-size: 40px;color: white;background: #174075;text-align: center;">'+playerName+'</div><div class="scoreDetails" style="background: #174075;width:100%;padding-left:5%;font-size:25px;"><div class="scoreDetailsHeadding" style="font-size: 45px;">Score Details</div><div class="scoreDetailsBody" style="font-size: 15px;padding-left: 50px;"><div class="scoreDetailsBody" style="font-size: 15px;padding-left: 130px;"><div style="display: flex;"><h1 style="width:50%;">Player Name</h1><h1 style="width:50%;">Players Score</h1></div><div style="display: flex;"><h2 style="width:50%;">COMPUTER</h2><h2 style="width:50%;">'+computerScore+'</h2></div><div style="display: flex;"><h2 style="width:50%;">'+playerName+'</h2><h2 style="width:50%;">'+playerScore+'</h2></div></div><div class="restartGameButton" ><button onclick="restartGame()" style="margin-bottom: 20px;font-size: 40px;margin-left:300px;">Restart Game</button></div></div></div></div></div>';
    }else if(document.getElementById("computerCardView").childElementCount==0){
    calculateScore();  
    document.getElementById('gameView').style.display="none";   
        document.getElementById('entryForm').style.display="block";         
      document.getElementById('entryForm').innerHTML='<div id="entryForm" style="display: block;border-color: transparent;"><div class="entryForm" style=" justify-content: center;border: none;align-items: center; width: 80%;top: 50px;left: 10%;height: 60%;"><div class="headdingWinner" style="width: 100%;height: 25%;font-size: 45px;text-align: center;padding: 15px;background: #174075;color: white;border-top-left-radius: 5px;border-top-right-radius: 5px;"><b>UNO WINNER</b></div><div class="winnerName" style="width: 100%;height: 20%;font-size: 40px;color: white;background: #174075;text-align: center;">Computer</div><div class="scoreDetails" style="background: #174075;width:100%;padding-left:5%;font-size:25px;"><div class="scoreDetailsHeadding" style="font-size: 45px;">Score Details</div><div class="scoreDetailsBody" style="font-size: 15px;padding-left: 50px;"><div class="scoreDetailsBody" style="font-size: 15px;padding-left: 130px;"><div style="display: flex;"><h1 style="width:50%;">Player Name</h1><h1 style="width:50%;">Players Score</h1></div><div style="display: flex;"><h2 style="width:50%;">COMPUTER</h2><h2 style="width:50%;">'+computerScore+'</h2></div><div style="display: flex;"><h2 style="width:50%;">'+playerName+'</h2><h2 style="width:50%;">'+playerScore+'</h2></div></div><div class="restartGameButton" ><button onclick="restartGame()" style="margin-bottom: 20px;font-size: 40px;margin-left:300px;">Restart Game</button></div></div></div></div></div>';
    }
        if(gameTurn=="player")
        unoClick=false;
        document.getElementById("unoButton").style.pointerEvents = 'auto';
    }
    
}
function calculateScore(){
    var count =document.getElementById("computerCardView").childElementCount;
    for(var i=1;i<=count;i++){
        computerCurrentCardNumber=document.getElementById("computerCardView").childNodes[i].className.slice(9,11);
        if(computerCurrentCardNumber.trim()!="p4"){
        switch(computerCurrentCardNumber.trim()) {
            case "1":
                computerScore=computerScore+1;
                break;
            case "2":
                computerScore=computerScore+2;
                break;
            case "3":
            computerScore=computerScore+3;
                break;
            case "4":
            computerScore=computerScore+4;
                break;
            case "5":
            computerScore=computerScore+5;
                break;
            case "6":
            computerScore=computerScore+6;
                break;
            case "7":
            computerScore=computerScore+7;
                break;
            case "8":
            computerScore=computerScore+8;
                break;
            case "9":
            computerScore=computerScore+9;
                break;
            case "0":
            computerScore=computerScore+0;
                break;
            case "R":
            computerScore=computerScore+20;
                break;
            case "S":
            computerScore=computerScore+20;
                break;
            case "W":
            computerScore=computerScore+50;
                break;
            case "p2":
            computerScore=computerScore+20;
                break;
        }}else{
        computerCurrentCardColor=document.getElementById("computerCardView").childNodes[i].className.slice(11,18);
        if(computerCurrentCardColor.trim()=="black"){
            computerScore=computerScore+50;
        }else{
            computerScore=computerScore+40;
        }
        }
    }
    var count =document.getElementById("playerCardView").childElementCount;
    for(var i=1;i<=count;i++){
        playerCurrentCardNumber=document.getElementById("playerCardView").childNodes[i].className.slice(9,11);
        if(playerCurrentCardNumber.trim()!="p4"){
        switch(playerCurrentCardNumber.trim()) {
            case "1":
                playerScore=playerScore+1;
                break;
            case "2":
            playerScore=playerScore+2;
                break;
            case "3":
            playerScore=playerScore+3;
                break;
            case "4":
            playerScore=playerScore+4;
                break;
            case "5":
            playerScore=playerScore+5;
                break;
            case "6":
            playerScore=playerScore+6;
                break;
            case "7":
            playerScore=playerScore+7;
                break;
            case "8":
            playerScore=playerScore+8;
                break;
            case "9":
            playerScore=playerScore+9;
                break;
            case "0":
            playerScore=playerScore+0;
                break;
            case "R":
            playerScore=playerScore+20;
                break;
            case "S":
            playerScore=playerScore+20;
                break;
            case "W":
            playerScore=playerScore+50;
                break;
            case "p2":
            playerScore=playerScore+20;
                break;
        }}else{
        playerCurrentCardColor=document.getElementById("playerCardView").childNodes[i].className.slice(11,18);
        if(playerCurrentCardColor.trim()=="black"){
            playerScore=playerScore+50;
        }else{
            playerScore=playerScore+40;
        }
        }
    }
}
function uno(){
    unoClick=true;
    alert("You Have Said UNO");
}
function skipYourTurn(){
    document.getElementById("playerCardView").style.pointerEvents = 'none';
    document.getElementById("SkipYourTurn").style.pointerEvents = 'none';
    gameTurn="computer";
    setTimeout(computerMove,3000);

}

function onTimer() {
  document.getElementById('mycounter').innerHTML = sec;
  document.getElementById('mycounter1').innerHTML = min;
  sec--;
  if(sec==0&&sec<=0&&min>0){
sec=60;
min--
  }
  if (sec <=0) {
      calculateScore();
      if(playerScore!=0||computerScore!=0){
      if(playerScore>computerScore){
        document.getElementById('entryForm').style.display="block";         
        document.getElementById('gameView').style.display="none";          
      document.getElementById('entryForm').innerHTML='<div id="entryForm" style="display: block;border-color: transparent;"><div class="entryForm" style=" justify-content: center;border: none;align-items: center; width: 80%;top: 50px;left: 10%;height: 60%;"><div class="headdingWinner" style="width: 100%;height: 25%;font-size: 45px;text-align: center;padding: 15px;background: #174075;color: white;border-top-left-radius: 5px;border-top-right-radius: 5px;"><b>UNO WINNER</b></div><div class="winnerName" style="width: 100%;height: 20%;font-size: 40px;color: white;background: #174075;text-align: center;">'+playerName+'</div><div class="scoreDetails" style="background: #174075;width:100%;padding-left:5%;font-size:25px;"><div class="scoreDetailsHeadding" style="font-size: 45px;">Score Details</div><div class="scoreDetailsBody" style="font-size: 15px;padding-left: 50px;"><div class="scoreDetailsBody" style="font-size: 15px;padding-left: 130px;"><div style="display: flex;"><h1 style="width:50%;">Player Name</h1><h1 style="width:50%;">Players Score</h1></div><div style="display: flex;"><h2 style="width:50%;">COMPUTER</h2><h2 style="width:50%;">'+computerScore+'</h2></div><div style="display: flex;"><h2 style="width:50%;">'+playerName+'</h2><h2 style="width:50%;">'+playerScore+'</h2></div></div><div class="restartGameButton" ><button onclick="restartGame()" style="margin-bottom: 20px;font-size: 40px;margin-left:300px;">Restart Game</button></div></div></div></div></div>';
      }else if(playerScore<computerScore){
        document.getElementById('entryForm').style.display="block";         
        document.getElementById('gameView').style.display="none";     
      document.getElementById('entryForm').innerHTML='<div id="entryForm" style="display: block;border-color: transparent;"><div class="entryForm" style=" justify-content: center;border: none;align-items: center; width: 80%;top: 50px;left: 10%;height: 60%;"><div class="headdingWinner" style="width: 100%;height: 25%;font-size: 45px;text-align: center;padding: 15px;background: #174075;color: white;border-top-left-radius: 5px;border-top-right-radius: 5px;"><b>UNO WINNER</b></div><div class="winnerName" style="width: 100%;height: 20%;font-size: 40px;color: white;background: #174075;text-align: center;">Computer</div><div class="scoreDetails" style="background: #174075;width:100%;padding-left:5%;font-size:25px;"><div class="scoreDetailsHeadding" style="font-size: 45px;">Score Details</div><div class="scoreDetailsBody" style="font-size: 15px;padding-left: 50px;"><div class="scoreDetailsBody" style="font-size: 15px;padding-left: 130px;"><div style="display: flex;"><h1 style="width:50%;">Player Name</h1><h1 style="width:50%;">Players Score</h1></div><div style="display: flex;"><h2 style="width:50%;">COMPUTER</h2><h2 style="width:50%;">'+computerScore+'</h2></div><div style="display: flex;"><h2 style="width:50%;">'+playerName+'</h2><h2 style="width:50%;">'+playerScore+'</h2></div></div><div class="restartGameButton" ><button onclick="restartGame()" style="margin-bottom: 20px;font-size: 40px;margin-left:300px;">Restart Game</button></div></div></div></div></div>';
      }else if(playerScore==computerScore){
        document.getElementById('entryForm').style.display="block";         
        document.getElementById('gameView').style.display="none";     
      document.getElementById('entryForm').innerHTML='<div id="entryForm" style="display: block;border-color: transparent;"><div class="entryForm" style=" justify-content: center;border: none;align-items: center; width: 80%;top: 50px;left: 10%;height: 60%;"><div class="headdingWinner" style="width: 100%;height: 25%;font-size: 45px;text-align: center;padding: 15px;background: #174075;color: white;border-top-left-radius: 5px;border-top-right-radius: 5px;"><b>UNO WINNER</b></div><div class="winnerName" style="width: 100%;height: 20%;font-size: 40px;color: white;background: #174075;text-align: center;">DRAW</div><div class="scoreDetails" style="background: #174075;width:100%;padding-left:5%;font-size:25px;"><div class="scoreDetailsHeadding" style="font-size: 45px;">Score Details</div><div class="scoreDetailsBody" style="font-size: 15px;padding-left: 50px;"><div class="scoreDetailsBody" style="font-size: 15px;padding-left: 130px;"><div style="display: flex;"><h1 style="width:50%;">Player Name</h1><h1 style="width:50%;">Players Score</h1></div><div style="display: flex;"><h2 style="width:50%;">COMPUTER</h2><h2 style="width:50%;">'+computerScore+'</h2></div><div style="display: flex;"><h2 style="width:50%;">'+playerName+'</h2><h2 style="width:50%;">'+playerScore+'</h2></div></div><div class="restartGameButton" ><button onclick="restartGame()" style="margin-bottom: 20px;font-size: 40px;margin-left:300px;">Restart Game</button></div></div></div></div></div>';
      }
    }
  }
  else {
    setTimeout(onTimer, 1000);
  }
}
function restartGame(){
    window.location.reload()
    document.getElementById("entryForm").innerHTML='<div class="entryForm" ><input type="text" placeholder="Enter Your Name" id="playerName"><button onclick="startGame()">Start Game</button></div>';
    document.getElementById('entryForm').style.display="block";         
        document.getElementById('gameView').style.display="none";     
        document.getElementById('playerCardView').innerHTML="";
        document.getElementById('computerCardView').innerHTML="";
        playerCardCount=0;
computerCardCount=0;
computerCardDraw="";
currentOpenCardNumber="";
currentOpenCardColor="";
changedColor="";
gameTurn="player";
wIndex="";
playerName="";
drawnCard="";
computerScore=0;
playerScore=0;
unoClick=false;
sec = 60;
min =1;
}
function changeDrawColor(){
    var e = document.getElementById("colorSelected");
    changedColor = e.options[e.selectedIndex].value;
    droppedCardView(currentOpenCardNumber,changedColor);
    document.getElementById('entryForm').style.display='none';
    document.getElementById('gameView').style.display='block';
    if(wIndex=="W"){
        if(gameTurn=="computer"){
            gameTurn="player";
            document.getElementById("playerCardView").style.pointerEvents = 'auto';
}else{
    gameTurn="computer";
    document.getElementById("playerCardView").style.pointerEvents = 'none';
    setTimeout(computerMove,3000);
}
}
wIndex="";
}
function droppedCardView(dropNumber,dropColor){
    var printnumber="";
    if(dropNumber=="+2"){
        printnumber="p2";
    }else if(dropNumber=="+4"){
        printnumber="p4";
    }
    if(dropNumber=="P2"){
        dropNumber="+2";
    }else if(dropNumber=="p4"){
        dropNumber="+4";
    }else{
        printnumber=dropNumber; 
    }
    
    currentOpenCardNumber=printnumber;
    currentOpenCardColor=dropColor ;
    document.getElementById('droppedCard').innerHTML='<div class="card num-'+printnumber+' '+dropColor+'"><span class="inner"><span class="mark">'+dropNumber+'</span></span></div>';
}