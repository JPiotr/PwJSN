const timeout = 3000; //timeout from animation
const slides = document.querySelector('.slides').querySelectorAll('img');
setInterval(changeSlideAuto, timeout);

let cssVar = parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue('--ACCounter'));

function changeSlide(slideId,x){
    document.querySelector('.animate-me').classList.remove('animate-me');
    document.querySelector('.actualSlide').classList.remove('actualSlide');
    slides[slideId-1].classList.add('animate-me');
    x.classList.add('actualSlide');
}

function changeSlideAuto(){
    console.log(cssVar);
    if(cssVar == slides.length - 1){
        cssVar = 0;
    }
    else{
        cssVar += 1;
    }

    document.querySelector(':root').style.setProperty('--ACCounter', cssVar);

}
