const timeout = 3000; //timeout from animation
const slides = document.querySelector('.slides').querySelectorAll('img');
setInterval(changeSlideAuto, timeout);


function changeSlide(slideId,x){
    document.querySelector('.animate-me').classList.remove('animate-me');
    document.querySelector('.actual').classList.remove('actual');
    slides[slideId-1].classList.add('animate-me');
    x.classList.add('actual');
}

function changeSlideAuto(){
    let nextImg = document.querySelector('.animate-me').nextElementSibling;
    let nextP = document.querySelector('.actual').nextElementSibling;

    document.querySelector('.animate-me').classList.remove('animate-me');
    document.querySelector('.actual').classList.remove('actual');
    nextImg.classList.add('animate-me');
    nextP.classList.add('actual');

}