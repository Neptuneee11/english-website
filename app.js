var row1 = 1;
var col1 = 1;
$(document).ready(function(){
    //generate a random ID for each entry

    console.log("ready");
    $("#minigameModal").on('hide.bs.modal', function(){
        $("#addJunkHere").empty()
    });
  });

function doFirst(){
    let inv=document.getElementsByClassName("invis");
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

function passdata(idNeeded){
    alert("something appears");
}

function minigameTimer(){

}

function minigame(){

    let trashCan = document.getElementById("addJunkHere");
    var choose = ["random_1","random_2"];

   

    for(var i=0; i<300; i++){
        var trash1 = document.createElement("div");
        var trash1_p = document.createElement("p");
    
        var text1 = document.createTextNode("lorem ipsum");
        trash1_p.appendChild(text1);
        trash1.appendChild(trash1_p);
        
        trash1.setAttribute("class",choose[getRandomInt(2)]);
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