//generic roll die function used by all dice 
function rollDie(n) {
    var randNum = Math.floor(Math.random() * n)+1;
    return randNum;
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

//buckets the dice into different groups based on value (really just gives a list of when the value changes in the dice list)
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

/*takes the dice and creates an object sorting them into the different harbor locations.
Example OutputL
var harbor = {
        "gold": [[6,'w'],[6,'g']],
        "spice": [[5,'w']],
        "textile":[[4,'w']],
        "grape": [[3,'w'],[3,'w'],[3,'g']],
        "olive": [[2,'w'],[2,'w'],[2,'w']],
        "goat": [[1,'w']]
    }

*/
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
    //based on how many groups there are, I am going ahead and returning the harbor before we get to the goods that will be blank anyways
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

//takes in the harbor object and uses it to put the dice in the table
function putDiceInTable(harborObj) {
    var x;
    for (x in harborObj) {
        let htmlText = '';
        for (y in harborObj[x]) {
            htmlText += numberDie(harborObj[x][y][0],harborObj[x][y][1]);
        }
        document.getElementById(x+"-data").innerHTML=htmlText;
    }
}

//rolls dice for Corinth
function roll() {
    let ele=document.getElementsByName('inlineRadioOptions');
    let goldDice=0;

    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            goldDice=parseInt(ele[i].value)
        }
    } 
    putDiceInTable(harbor(storeValues(9,goldDice)));
}

//wrapper for all of the "Use" buttons
function clearWrapper(name) {
    var elements=document.querySelectorAll('td#'+name+'-data svg')
    if (elements!==null) {
        for (i = 0; i < elements.length; i++) {
            elements[i].remove();
          }
    }
}

//functions for each of the "use" buttons
function clearGoat() {
    clearWrapper('goat')
}
function clearOlive() {
    clearWrapper('olive')
}
function clearGrape() {
    clearWrapper('grape')
}
function clearTextile() {
    clearWrapper('textile')
}
function clearSpice() {
    clearWrapper('spice')
}
function clearGold() {
    clearWrapper('gold')
}

//remove all gold dice
function removeGoldDice() {
    var goldDice=document.querySelectorAll('svg.gold');
    if (goldDice!==null) {
        for (let i = 0; i < goldDice.length; i++) {
            goldDice[i].remove()
        }
    }
}

//castles of burgundy functions
function colorDie() {
    let svgPathPart1 = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(0,0,0)" class="bi bi-dice-1" viewBox="0 0 16 16"><circle cx="8" cy="8" r="1.5"/><path fill="'
    let svgPathPart2 = '" d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10z"/><path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/></svg>'
    let color = 'rgb(0,0,0)'
    
    switch(rollDie(6)) {
        case 1:
            //purple 'rgb(128, 0, 128)' 
            color = 'rgb(128, 0, 128)';
            break;
        case 2:
            //yellow rgb(255, 255, 0)
            color = 'rgb(255, 255, 0)';
            break;
        case 3:
            //grey rgb(128, 128, 128)
            color = 'rgb(128, 128, 128)';
            break;
        case 4:
            //orange rgb(255, 165, 0)
            color = 'rgb(255, 165, 0)';
            break;
        case 5:
            //blue rgb(0,89,255)
            color = 'rgb(0,89,255)';
            break;
        case 6:
            //green rgb(0,255,0)
            color = 'rgb(0,255,0)';
            break;
    }
    return svgPathPart1+color+svgPathPart2
}

function numberDie(n,color) {
    var colorClass='';
    if (color=='g') {
        colorClass=' gold'
    }
    switch(n) {
        case 1:
            return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-dice-1'+colorClass+'" viewBox="0 0 16 16"><circle cx="8" cy="8" r="1.5"/><path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/></svg>'
        case 2: 
            return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-dice-2'+colorClass+'" viewBox="0 0 16 16"><path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/><path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>'
        case 3:
            return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-dice-3'+colorClass+'" viewBox="0 0 16 16"><path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/><path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>'
        case 4:
            return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-dice-4'+colorClass+'" viewBox="0 0 16 16"><path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/><path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>'
        case 5:
            return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-dice-5'+colorClass+'" viewBox="0 0 16 16"><path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/><path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>'
        case 6:
            return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-dice-6'+colorClass+'" viewBox="0 0 16 16"><path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/><path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-8 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>'
    }
    //should never get here
    return "ERROR"
}

function timerDie() {
    let timeSVG='<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16"><path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/></svg>';
    switch(rollDie(3)) {
        case 1:
            //single time
            return timeSVG
        case 2:
            //single time
            return timeSVG
        case 3:
            //double time
            return timeSVG+" "+timeSVG
    }
    //should never get here
    return "ERROR"
}

function rollCoBDice() {
    let numberElement = document.getElementById("number-dice");
    numberElement.innerHTML=numberDie(rollDie(6))+" "+numberDie(rollDie(6));
    
    let colorElement = document.getElementById("color-dice");
    colorElement.innerHTML=colorDie()+" "+colorDie()

    let timerElement = document.getElementById("timer-dice");
    timerElement.innerHTML=timerDie();
}