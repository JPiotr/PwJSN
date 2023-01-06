function przelicz(){

    let Dmin = document.querySelector("#min");
    let Dmax = document.querySelector("#max");
    let Davg = document.querySelector("#avg");
    let Dsum = document.querySelector("#sum");

    let ins = document.querySelectorAll("input[type='text']");
    let numbers = [];

    let sum = 0;
    let value = 0;

    for(let i = 0; i<ins.length; i++){

        value = ins[i].value;
        sum += parseInt(value);
        numbers.push(parseInt(value));
    }
    let max = Math.max(...numbers);
    let min = Math.min(...numbers);
    let avg = sum / numbers.length;



    Dmin.innerHTML = "Min: " + min;
    Dmax.innerHTML = "Max: " + max;
    Dsum.innerHTML = "Sum: " + sum;
    Davg.innerHTML = "Avg: " + avg;

}

function dodajpole(){
    let v = document.querySelector("#temp").cloneNode();
    v.value = 0;
    v.addEventListener("input",przelicz);
    document.querySelector("#inputs").appendChild(v);
    przelicz();
}
function usunpole(){
    document.querySelector("#inputs").removeChild(document.querySelector("#inputs").lastChild);
    przelicz();
}


let x = document.querySelectorAll("input[type='text']");
for (i = 0; i<=x.length; i++){
    try{
        x[i].addEventListener("input",przelicz);
    }
    catch (e){

    }


}