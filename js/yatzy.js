let yatzy = [];
let allP = document.querySelectorAll(".col p");


function getNumOfDices() {

  let dicesChoosed = document.querySelectorAll(".choosedDice");

  return 5 - dicesChoosed.length;

}

function rollDice() {
  let dice = [];

  let num = getNumOfDices();

  for (let i = 0; i < num; i++) {
    dice[i] = Math.floor(Math.random() * 6) + 1;
  }
  return dice;
}

for (let i = 0; i < allP.length; i++) {

  allP[i].addEventListener("click", function () {
    if (this.classList.contains("choosedDice")) {
      this.classList.remove("choosedDice");
      this.classList.add("notChoosed");
    }
    else {
      this.classList.add("choosedDice");
      this.classList.remove("notChoosed");
    }

  })

}

let btnClicked = document.querySelector(".rolledButton");
let numOfRolls = 0;
let minors = document.querySelectorAll(".minor");
let Majors = document.querySelectorAll(".Major");

btnClicked.addEventListener("click", function () {

  if (numOfRolls < 3) {
    let dice = rollDice();

    let notChoosed = document.querySelectorAll(".col .notChoosed");
    for (let i = 0; i < notChoosed.length; i++) {
      notChoosed[i].innerHTML = dice[i];
    }

    for (let i = 0; i < minors.length; i++) {
      if (minors[i].classList.contains("notchoosedMinor"))
        minors[i].innerHTML = "";
    }

    for (let i = 0; i < Majors.length; i++) {
      if (Majors[i].classList.contains("notchoosedMajors"))
      Majors[i].innerHTML = "";
    }

    // Here we will write the code will put the values in minor

    putsAllMinors();

    // end of it
  }
  else
    btnClicked.disabled = true;

  numOfRolls++;
  document.getElementById("threeOfKind").innerHTML = checkThreeOfKind();
  document.getElementById("FourOfKind").innerHTML = checkFourOfKind();
  document.getElementById("Yatzy").innerHTML = checkYatzy();
  document.getElementById("SamllStright").innerHTML = checkSamllStright();
  document.getElementById("LargeStright").innerHTML = checkSLargeStright();
  document.getElementById("Chance").innerHTML = CheckChance();
  document.getElementById("FullHouse").innerHTML = CheckFullHouse();
});

let sum = 0;
let sumPosition = document.getElementById("sum");
let bonusPosition = document.getElementById("bonus");
for (let i = 0; i < minors.length; i++) {

  minors[i].addEventListener("click", function () {
    sum = 0;
    if (minors[i].innerHTML == "") {
      if (confirm("Are you sure you want to take 0.")) {
        this.classList.remove("notchoosedMinor");
        this.classList.add("choosedMinor");
        this.innerHTML = "0";

        numOfRolls = 0;
        let dicesChoosed = document.querySelectorAll(".choosedDice");

        for (let i = 0; i < dicesChoosed.length; i++) {
          dicesChoosed[i].classList.remove("choosedDice");
          dicesChoosed[i].classList.add("notChoosed");
        }

        for (let i = 0; i < allP.length; i++) {
          allP[i].innerHTML = "Dice"
        }
        btnClicked.disabled = false;


        ///////////////////////////////////////////////////////////////////
        let choosedMinors = document.querySelectorAll(".choosedMinor");
        for (let i = 0; i < choosedMinors.length; i++) {
          sum += Number( choosedMinors[i].innerHTML );
        }

        if (sum >= 63)
          bonusPosition.innerHTML = "+35";
        else
          bonusPosition.innerHTML = "0";

        sumPosition.innerHTML = sum;

      }





    }

    else {
      if (this.classList.contains("notchoosedMinor")) {
        this.classList.remove("notchoosedMinor");
        this.classList.add("choosedMinor");
        numOfRolls = 0;
        let dicesChoosed = document.querySelectorAll(".choosedDice");

        for (let i = 0; i < dicesChoosed.length; i++) {
          dicesChoosed[i].classList.remove("choosedDice");
          dicesChoosed[i].classList.add("notChoosed");
        }

        for (let i = 0; i < allP.length; i++) {
          allP[i].innerHTML = "Dice"
        }

        btnClicked.disabled = false;



        let choosedMinors = document.querySelectorAll(".choosedMinor");
        for (let i = 0; i < choosedMinors.length; i++) {
          sum += Number( choosedMinors[i].innerHTML );
        }

        if (sum >= 63)
          bonusPosition.innerHTML = "+35";
        else
          bonusPosition.innerHTML = "0";

        sumPosition.innerHTML = sum;


      }
    }

  })

}


function putsAllMinors() {
  let notChoosed = document.querySelectorAll(".col .notChoosed");

  for (let i = 0; i < allP.length; i++) {

    let y = Number(allP[i].innerHTML);

    if (document.getElementById("minor" + y).classList.contains("choosedMinor")) {
      continue;
    }
    else {

      if (document.getElementById("minor" + y).innerHTML == "")
        document.getElementById("minor" + y).innerHTML = y;
      else {
        let temp = Number(document.getElementById("minor" + y).innerHTML);
        // console.log("before adding " + temp);
        temp += y;
        document.getElementById("minor" + y).innerHTML = temp;
        // console.log("after adding " + temp);
      }

    }


  }

}


function checkThreeOfKind(){
  let sum = 0;
  let newArray = [];
  for(let i=0; i<allP.length; i++){
    newArray[i] = Number(allP[i].innerHTML);
  }

  console.log( "Dices : " + newArray);
  console.log( "Dices sorted : " + newArray.sort());

  newArray = newArray.sort();

  for(let i=0; i<newArray.length-2; i++){
    // console.log("NEW " + newArray)
    if( newArray[i] == newArray[i+1] && newArray[i] == newArray[i+2] ){
      // alert("I got a three of kind here")
      for(let j=0; j<newArray.length; j++){
        sum += newArray[j];
        // alert("Three Of kind");
      }
      return sum;
    }

  }

  return sum;

}

function checkFourOfKind(){
    let sum = 0;
    let newArray = [];
    for(let i=0; i<allP.length; i++){
      newArray[i] = Number(allP[i].innerHTML);
    }
  
    console.log( "Dices : " + newArray);
    console.log( "Dices sorted : " + newArray.sort());
  
    newArray = newArray.sort();
  
    for(let i=0; i<newArray.length-2; i++){
      // console.log("NEW " + newArray)
      if( newArray[i] == newArray[i+1] && newArray[i] == newArray[i+2]  && newArray[i] == newArray[i+3] ){
        // alert("I got a three of kind here")
        for(let j=0; j<newArray.length; j++){
          sum += newArray[j];
          // alert("Three Of kind");
        }
        return sum;
      }
  
    }
  
    return sum;}
  
function checkYatzy(){
        let sum = 50;
        for(let i=0;i<allP.length;i++){
                if( allP[i] == allP[i+1] == allP[i+2] == allP[i+3] == allP[i+4] ){
            return sum;}
          else {
            return 0;
          }
        }
}

function checkSamllStright(){
  
  let small = 30;
  let newArray=[];
  let array1 = [1,2,3,4];
  let array2=[2,3,4,5];
  let array3=[3,4,5,6];
  for(let i=0; i<allP.length; i++){
    newArray[i] = Number(allP[i].innerHTML);}

    for(i=0; i<allP.length;i++){
    if(array1.every(i=> newArray.includes(i))){
     return small;}
      else if(array2.every(i => newArray.includes(i))){
       return small;}
        else if(array3.every(i=> newArray.includes(i))){
         return small;}
     else {
        return 0;
       }
    }
  }

function checkSLargeStright(){
  
  let sum = 40;
  let newArray=[];
  let array2 = [1,2,3,4,5];
  let array1 = [2,3,4,5,6];
  for(let i=0; i<allP.length; i++){
    newArray[i] = Number(allP[i].innerHTML);}
    for(i=0; i<allP.length;i++){
    if(array2.every(i=> newArray.includes(i))){
     return sum;}
     else if(array1.every(i=> newArray.includes(i))){
        return sum;}
        else{
          return 0;

        }
    }
  }


  function CheckChance(){
  
    let sum = 0;
    for(let i=0; i<allP.length; i++){
      sum += Number(allP[i].innerHTML);}
      return sum;
    }

    

function CheckFullHouse(){
  let sum = 25;
  let newArray = [];
  for(let i=0; i<allP.length; i++){
    newArray[i] = Number(allP[i].innerHTML);
  }


  newArray = newArray.sort();

  for(let i=0; i<newArray.length-2; i++){
    if(checkTwoOfKind()&& checkThreeOfKind())
    {
        return sum;
    }
    else{
        return 0;
    }
}


function checkTwoOfKind(){
  let newArray = [];
  for(let i=0; i<allP.length; i++){
    newArray[i] = Number(allP[i].innerHTML);}
  newArray = newArray.sort();
 for(let i=0; i<newArray.length; i++){

 if(newArray[i] == newArray[i+1] || newArray[i+1] == newArray[i+2] || newArray[i+2] == newArray[i+3] || newArray[i+3] == newArray[i+4]){
  return true;}
}}}