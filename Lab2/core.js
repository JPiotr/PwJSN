const sliders = document.querySelector(".slide");

const main = document.querySelector('main')
const timeoutRef = setTimeout(
    () => {
        main.innerHTML='From setTimeout'
    },
    2000
)


let licznik = 0
const intervalRef = setInterval(
    () => {
        main.innerHTML='From interval' + licznik++
    },
    2000
)

// kasujemy setInterval
// clearInterval(intervalRef)

// kasujemy setTimeout
clearTimeout(timeoutRef)


// window.requestAnimationFrame