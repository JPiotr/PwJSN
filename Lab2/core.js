const sliders = document.querySelectorAll(".slide");
const slider = document.querySelector(".slides");

const main = document.querySelector('#main');

const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const size = 600;

let licznik = 1;
for (let i = 0; i < sliders.length; i++) {

    let temp = document.createElement("div");
    temp.style.backgroundColor = "green";
    temp.classList.add("dot");
    temp.addEventListener("click",()=>{
        toMe(i);
    });
    temp.addEventListener("mouseenter",()=>{
        clearTimeout(intervalRef);
    });
    main.appendChild(temp);
}

const dots = document.querySelectorAll(".dot");

slider.style.transform = "translateX(" + (-size * licznik) + "px)";
dots[licznik].style.backgroundColor = "orange";

prev.addEventListener('click',toLeft);
next.addEventListener('click',toRigth);

slider.addEventListener("transitionend", ()=>{
    if(licznik == sliders.length -1){
        slider.style.transition = "none";
        dots[licznik].style.backgroundColor = "green";
        licznik = 1;
        dots[licznik].style.backgroundColor = "orange";
        slider.style.transform = "translateX(" + (-size * licznik) + "px)";
    }
    if(licznik == 0){
        slider.style.transition = "none";
        dots[licznik].style.backgroundColor = "green";
        licznik = sliders.length - 2;
        dots[licznik].style.backgroundColor = "orange";
        slider.style.transform = "translateX(" + (-size * licznik) + "px)";
    }
})

function toLeft(){
    if(licznik <= 0)return;
    slider.style.transition = "transform 0.5s ease-in-out";
    dots[licznik].style.backgroundColor = "green";
    licznik--;
    dots[licznik].style.backgroundColor = "orange";
    slider.style.transform = "translateX(" + (-size * licznik) + "px)";
}

function toRigth(){
    if(licznik >= sliders.length-1)return;
    slider.style.transition = "transform 0.5s ease-in-out";
    dots[licznik].style.backgroundColor = "green";
    licznik++;
    dots[licznik].style.backgroundColor = "orange";
    slider.style.transform = "translateX(" + (-size * licznik) + "px)";
}

function toMe(element){
    if(licznik >= sliders.length-1)return;
    slider.style.transition = "transform 0.5s ease-in-out";
    dots[licznik].style.backgroundColor = "green";
    licznik = element;
    dots[licznik].style.backgroundColor = "orange";
    slider.style.transform = "translateX(" + (-size * licznik) + "px)";
}

let intervalRef = setInterval(
    () => {
        toRigth()
    },
    2000
)

slider.addEventListener("mouseenter",()=>{
    clearTimeout(intervalRef);
});
next.addEventListener("mouseenter",()=>{
    clearTimeout(intervalRef);
});
prev.addEventListener("mouseenter",()=>{
    clearTimeout(intervalRef);
});

slider.addEventListener("mouseleave",()=>{
    intervalRef = setInterval(
            () => {
                toRigth()
            },2000)
});