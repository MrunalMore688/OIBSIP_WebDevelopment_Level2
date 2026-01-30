let inputDisplay = document.getElementById("inputDisplay");
let result = document.getElementById("result");

function press(value){
    inputDisplay.innerText += value;
}

function clearAll(){
    inputDisplay.innerText = "";
    result.value = "";
}

function backspace(){
    inputDisplay.innerText = inputDisplay.innerText.slice(0,-1);
}

function calculate(){
    try{
        result.value = eval(inputDisplay.innerText);
    }
    catch{
        result.value = "Error";
    }
}
