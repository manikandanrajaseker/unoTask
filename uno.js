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
function startGame(){
    playerName=document.getElementById('playerName').value;
    console.log(playerName);
    document.getElementById('entryForm').innerHTML="";
    document.getElementById('gameView').style.display='block';
    
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
    document.getElementById('computerCardView').innerHTML+='<div class="card num-'+randamNumber+' '+randColor+'   '+computerCardCount+'" id="computerCard'+computerCardCount+'"   alt="'+variableFunctionCall+'"><span class="inner"><span class="mark">'+changedRand+'</span></span></div>';
    computerCardCount++;
   
}
else if(byWhom=="openCard"){
    randColor = colorsForCards[(Math.random() * colorsForCards.length-1) | 0];
    currentOpenCardNumber=randamNumber;
    currentOpenCardColor=randColor;
document.getElementById('droppedCard').innerHTML='<div class="card num-'+randamNumber+' '+randColor+'"><span class="inner"><span class="mark">'+changedRand+'</span></span></div>';
}
 if(byWhom=="computerCardView"){
     if(computerCardCount>=7){
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
        debugger;
        if(randamNumber==currentOpenCardNumber||randColor==currentOpenCardColor||randColor=="black"){
            gameTurn="player";
            document.getElementById("playerCardView").style.pointerEvents = 'auto';
        }else{
           gameTurn="computer";
           document.getElementById("playerCardView").style.pointerEvents = 'nome';
           computerMove();
        }
    }
 }
}

function computerMove(){
    debugger;
    if(gameTurn=="computer"){
    var count =document.getElementById("computerCardView").childElementCount;
    var loopcount=0;
    for(var i=1;i<=count;i++){
        console.log(document.getElementById("computerCardView").childElementCount);
        console.log(document.getElementById("computerCardView").childNodes[i].className);
        console.log(document.getElementById("computerCardView").childNodes[i].className.slice(9,11));
        computerCurrentCardNumber=document.getElementById("computerCardView").childNodes[i].className.slice(9,11);
        computerCurrentCardColor=document.getElementById("computerCardView").childNodes[i].className.slice(11,18);
        computerCurrentCardId=document.getElementsByClassName(document.getElementById("computerCardView").childNodes[i].className)[0].id;
        console.log(document.getElementById("computerCardView").childNodes[i].className.slice(11,18));
        console.log(document.getElementsByClassName(document.getElementById("computerCardView").childNodes[i].className)[0].id);
        if(computerCurrentCardNumber.trim()==currentOpenCardNumber.trim()||computerCurrentCardColor.trim()==currentOpenCardColor||computerCurrentCardColor.trim()=="black"){
            console.log(computerCurrentCardNumber,computerCurrentCardColor,computerCurrentCardId);
            removeCardFromView(computerCurrentCardId.trim(),computerCurrentCardNumber.trim(),computerCurrentCardColor.trim());
            i=count+1;
            break;
        }
        loopcount++;
    }
    if(loopcount==count){
        drawCard("computerCardView");
    }
}
}

function execute(){
    document.getElementById('entryForm').innerHTML="";
    document.getElementById('gameView').style.display='block';
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
    debugger;
    if(currentOpenCardNumber=="p2"){
        currentOpenCardNumber="+2"
    }else if(currentOpenCardNumber=="p4"){
        currentOpenCardNumber="+4";
    }else if(number=="p2"){
        number="+2"
    }else if(number=="p4"){
        number="+4";
    }
    if(currentOpenCardColor==color||currentOpenCardNumber==number||color=="black"){
        
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
        
        if(number=="S"||number=="R"||number=="+2"||number=="+4"){
                if(gameTurn=="computer"){
                    gameTurn="computer";
                    document.getElementById("playerCardView").style.pointerEvents = 'none';
        computerMove();
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
        computerMove();
        }
        }else if(number=="W"&&gameTurn=="computer"){
                    document.getElementById("playerCardView").style.pointerEvents = 'auto';
                    gameTurn="player";
        }
    }
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
computerMove();
}
}
wIndex="";
}
function droppedCardView(dropNumber,dropColor){
    var printnumber="";
    if(dropNumber=="P2"){
        dropNumber="+2";
    }else if(dropNumber=="p4"){
        dropNumber="+4";
    }else{
        printnumber=dropNumber; 
    }
    if(dropNumber=="+2"){
        printnumber="p2";
    }else if(dropNumber=="+4"){
        printnumber="p4";
    }
    currentOpenCardNumber=printnumber;
    currentOpenCardColor=dropColor ;
    document.getElementById('droppedCard').innerHTML='<div class="card num-'+printnumber+' '+dropColor+'"><span class="inner"><span class="mark">'+dropNumber+'</span></span></div>';
}