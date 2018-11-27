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
var unoClick=false;
function startGame(){
    playerName=document.getElementById('playerName').value;
    console.log(playerName);
    if(playerName.length>2){
    document.getElementById('entryForm').innerHTML="";
    document.getElementById('gameView').style.display='block';
    document.getElementById("computerCardView").style.pointerEvents = 'none';
    document.getElementById("SkipYourTurn").style.pointerEvents = 'none';
    document.getElementById("droppedCard").style.pointerEvents = 'none';
}else{
    alert("Name should contain atleast more then 2");
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
    //document.getElementById('computerCardView').innerHTML+='<div class="card num-'+randamNumber+' '+randColor+'   '+computerCardCount+'" id="computerCard'+computerCardCount+'"   alt="'+variableFunctionCall+'"><span class="inner"><span class="mark">'+changedRand+'</span></span></div>';
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
        if(drawnCard!="+2"||drawnCard!="+4"||drawnCard!="p2"||drawnCard!="p4")
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
        if(drawCard!="+4"||drawnCard!="+2"||drawnCard!="+4"||drawnCard!="p2"||drawnCard!="p4")
        if(randamNumber==currentOpenCardNumber||randColor==currentOpenCardColor||randColor=="black"){
            gameTurn="player";
            document.getElementById("playerCardView").style.pointerEvents = 'auto';
            document.getElementById("SkipYourTurn").style.pointerEvents = 'auto';
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
        computerCurrentCardNumber=document.getElementById("computerCardView").childNodes[i].className.slice(9,11);
        computerCurrentCardColor=document.getElementById("computerCardView").childNodes[i].className.slice(11,18);
        computerCurrentCardId=document.getElementsByClassName(document.getElementById("computerCardView").childNodes[i].className)[0].id;
        if(computerCurrentCardNumber.trim()==currentOpenCardNumber.trim()||computerCurrentCardColor.trim()==currentOpenCardColor||computerCurrentCardColor.trim()=="black"){
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
    debugger;
    drawnCard=number;
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
        if(document.getElementById("playerCardView").childElementCount==1&&unoClick!=true&&gameTurn=="player"){
            drawCard("playerCardView");
            drawCard("playerCardView");
        }
        
        if(document.getElementById("playerCardView").childElementCount==0){
    document.getElementById('entryForm').style.display="block";         
    document.getElementById('gameView').style.display="none";            
    document.getElementById('entryForm').innerHTML="<div class='entryForm' style='justify-content: center;align-items: center;padding-left: 80px;padding-top: 50px;'> <h1>You Won!!! "+playerName+"</h1></div>";
        }else if(document.getElementById("computerCardView").childElementCount==0){
    document.getElementById('gameView').style.display="none";   
    document.getElementById('entryForm').style.display="block";         
    document.getElementById('entryForm').innerHTML="<div class='entryForm' style='justify-content: center;display:auto;align-items: center;padding-left: 80px;padding-top: 50px;'> <h1>Computer Won</h1></div>";
        }
        if(gameTurn=="player")
        unoClick=false;
        document.getElementById("unoButton").style.pointerEvents = 'auto';
    }
    
}
function uno(){
    unoClick=true;
}
function skipYourTurn(){
    document.getElementById("playerCardView").style.pointerEvents = 'none';
    document.getElementById("SkipYourTurn").style.pointerEvents = 'none';
    gameTurn="computer";
    computerMove();

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