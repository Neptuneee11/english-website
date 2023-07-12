//minigame variables
isComplete = false;
hasFile = false;
pipeDestroyed = false;
valves = [false,false,false];

var row1 = 1;
var col1 = 1;
$(document).ready(function(){
    console.log("ready");

    //Empty the modal everytime it's closed
    $("#minigameModal").on('hide.bs.modal', function(){
        $("#addJunkHere").empty()
    });
    $("#popUpModal").on('hide.bs.modal', function(){
        $("#addInfoHere").empty()
    });
  });

function doFirst(){
    let inv=document.getElementsByClassName("invis");

    //reset variables
    //minigame variables
    isComplete = false;
    hasFile = false;
    valves = [false,false,false];

    //set them all to display: none except for the center
    for(var i=0;i<inv.length;i++){
        if(inv[i].id!="grid_1_1"){
            inv[i].style.display = "none";
        }
        else{
            inv[i].style.display = "block";
        }
    }
}

function left(){
    console.log("left");
    checkValidity(row1, col1-1);
}

function right(){
    console.log("right");
    checkValidity(row1, col1+1);
}

function up(){
    console.log("up");
    checkValidity(row1-1, col1);
}

function down(){
    console.log("down");
    checkValidity(row1+1, col1);
}

function checkValidity(newRow, newCol){//moves the image to crop something else
    //unload the current one
    let toUnload = getLoadedDiv(col1, row1);
    toUnload.style.display = "none";

    if(newRow < 0 || newRow >= 3) {}
    else{ row1=newRow; }
    if(newCol < 0  || newCol >= 3) {}
    else{ col1=newCol; }

    console.log(col1);
    console.log(row1);
    
    //show the pic
    document.getElementById("gameView").style.backgroundPositionX = (50*col1).toString()+"%";
    document.getElementById("gameView").style.backgroundPositionY = (50*row1).toString()+"%";

    //load the clickable divs
    let toload = getLoadedDiv(col1, row1);
    toload.style.display = "block";
}

function getLoadedDiv(column, row){
    switch(row){
        case 0:
            switch(column){
                case 0:
                    return document.getElementById("grid_0_0");
                case 1:
                    return document.getElementById("grid_0_1");
                case 2:
                    return document.getElementById("grid_0_2");
            }
            break;
        case 1:
            switch(column){
                case 0:
                    return document.getElementById("grid_1_0");
                case 1:
                    return document.getElementById("grid_1_1");
                case 2:
                    return document.getElementById("grid_1_2");
            }
            break;
        case 2:
            switch(column){
                case 0:
                    return document.getElementById("grid_2_0");
                case 1:
                    return document.getElementById("grid_2_1");
                case 2:
                    return document.getElementById("grid_2_2");
            }
            break;
    }
}

function minigame(){

    let trashCan = document.getElementById("addJunkHere");
    var choose = ["random_1","random_2","random_3","random_4","random_5"];
    var thumbnailRandom = ["See this!","Breaking news","suggested","we felt that you might be interested"];
    var imgSources = ["headline1.png","headline2.png","headline3.png","headline4.png","headline5.png"];

    for(var i=0; i<100; i++){
        var trash1 = document.createElement("div");
        var trash1_p = document.createElement("p");
    
        var text1 = document.createTextNode(thumbnailRandom[getRandomInt(thumbnailRandom.length)]);
        var img1 = document.createElement('img');
        img1.src = imgSources[getRandomInt(imgSources.length)];
        trash1.appendChild(img1);
        trash1_p.appendChild(text1);
        trash1.appendChild(trash1_p);
        
        trash1.setAttribute("class",choose[getRandomInt(choose.length)]);
        trashCan.appendChild(trash1);
    }
    //add the button that closes it
    var esc = document.createElement("button");
    esc.setAttribute("data-bs-dismiss","modal");
    esc.innerHTML = "press to exit";
    
    trashCan.appendChild(esc);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function objectClicked(idPassed){//if you click an information piece
    
    let choices = document.getElementById(idPassed).children;

    let choice = null;

    //check if complete
    if(isComplete==true){
        choice = choices[1];
    }
    else{
        choice = choices[0];
    }

    passToModal(choice);

}

function minigameCheck(idPassed){// if you click a puzzle piece
    //check for conditions
    if(idPassed==="file"){
        hasFile=true;
        alert("Got a file. It can break a pipe.")
    }

    if(idPassed==="pipe"){
        if(hasFile==true){
            alert("pipe broken");
            pipeDestroyed = true;
        }
        else{
            alert("It's a water pipe. A leak could reveal a lot more information");
        }
    }

    if(idPassed==="valve_1"){
        valves[0] = true;
        alert("turned valve 1/3");
    }
    else if(idPassed==="valve_2"){
        valves[1] = true;
        alert("turned valve 2/3");
    }
    else if(idPassed==="valve_3"){
        valves[2] = true;
        alert("turned valve 3/3");
    }


    //check for map transition
    if(!valves.includes(false) && pipeDestroyed==true){

        alert("a leak has been detected. system failure imminent");

        isComplete = true;

        //change map picture
        document.getElementById("gameView").style.backgroundImage = 'url("theMap_after.png")';

        
    }

    console.log(hasFile);
    console.log(pipeDestroyed);
    console.log(valves);
}

function passToModal(passed){
    console.log(passed);

    var added = passed.cloneNode(true);

    document.getElementById("addInfoHere").appendChild(added);

    let leStyle = passed.getAttribute("style");
    console.log(leStyle);
    document.getElementById("addInfoHere").setAttribute("style", leStyle);
}