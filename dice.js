//roll die
function rollDie(n) {
    var randNum = Math.floor(Math.random() * n)+1;
    return randNum;
}
//display result
function displayResult(id) {
    let dice = storeValues(9,3)
    var resultElement = document.getElementById(id);
    resultElement.innerHTML=dice
    var slice=bucket(dice)
    var resultElement2 = document.getElementById(2);
    resultElement2.innerHTML=slice
    var resultElement3 = document.getElementById(3);
    resultElement3.innerHTML=harbor(dice)
    console.log(harbor(dice))
    
}

//output - 2D list of the form [[6,'w'],[6,'g'],[5,'w'],[1,'w']]
function storeValues(white,gold) {
    let newList = [];
    for (var i = 0; i < white; i++) {
        newList.push([rollDie(6),'w']);
    }
    for (var j = 0; j < gold; j++) {
        newList.push([rollDie(6),'g']);
    }
    //sort this decending
    return newList.sort(function(a, b){return b[0]-a[0]})
}

//break this up into the correct buckets

function bucket(ary) {
    let sliceList = []
    let startPoint=ary[0][0];
    for (var i = 1; i < ary.length; i++) {
        if (i==1) {
            if (startPoint!==ary[i][0]) {
                sliceList.push(i);
            }
        }
        else {
            if (ary[i-1][0]!==ary[i][0]) {
                sliceList.push(i); 
            }
        }
    }
    return sliceList
}


function harbor(dice) {
    let sliceAry=bucket(dice)
    let sliceLength = sliceAry.length
    var harbor = {
        "gold": [],
        "spice": [],
        "textile":[],
        "grape": [],
        "olive": [],
        "goat": []
    }
    let helperList=["goat","olive","grape","textile","spice"]
    if (sliceLength==0) {
        harbor["gold"]=dice
        return harbor
    }
    harbor["gold"]=dice.slice(0,sliceAry[0])
    harbor["goat"]=dice.slice(sliceAry[sliceLength-1])
    if (sliceLength==1) {
        return harbor
    }
    harbor["olive"]=dice.slice(sliceAry[sliceLength-2],sliceAry[sliceLength-1])
    if (sliceLength==2) {
        return harbor
    }
    harbor["grape"]=dice.slice(sliceAry[sliceLength-3],sliceAry[sliceLength-2])
    if (sliceLength==3) {
        return harbor
    }
    harbor["textile"]=dice.slice(sliceAry[sliceLength-4],sliceAry[sliceLength-3])
    if (sliceLength==4) {
        return harbor
    }
    harbor["spice"]=dice.slice(sliceAry[sliceLength-5],sliceAry[sliceLength-4])
    if (sliceLength==5) {
        return harbor
    }
    //code should never get here with 6 sided dice
    return harbor
}

//clicking this hides the gold numbers ---need to do some CSS for this too
function hideGold() {

}

//takes in the harborobj
function putDiceInTable(harborObj) {
    var x;
    for (x in harborObj) {
        document.getElementById(x+"-data").innerHTML=harborObj[x];
    }
}


function test() {
    putDiceInTable(harbor(storeValues(9,3)))
}


//start castles of burgundy functions
function colorDie() {
    switch(rollDie(6)) {
        case 1:
            return "Purple"
        case 2: 
            return "Yellow"
        case 3:
            return "Gray"
        case 4:
            return "Orange"
        case 5:
            return "Blue"
        case 6:
            return "Green"
    }
    //should never get here
    return "ERROR"
}

function timerDie() {
    switch(rollDie(3)) {
        case 1:
            return "Single Time"
        case 2:
            return "Single Time"
        case 3:
            return "Double Time"
    }
    //should never get here
    return "ERROR"
}

function rollCoBDice() {
    let numberElement = document.getElementById("number-dice");
    numberElement.innerHTML=rollDie(6)+" "+rollDie(6);
    
    let colorElement = document.getElementById("color-dice");
    colorElement.innerHTML=colorDie()+" "+colorDie()

    let timerElement = document.getElementById("timer-dice");
    timerElement.innerHTML=timerDie();
}