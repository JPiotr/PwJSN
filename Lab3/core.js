document.addEventListener('keypress', onKeyPress)

const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'q': document.querySelector('#s4'),
    'w': document.querySelector('#s5'),
    'e': document.querySelector('#s6'),
    'z': document.querySelector('#s7'),
    'x': document.querySelector('#s8'),
    'c': document.querySelector('#s9')
}

function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    playSound(sound)
}
function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}