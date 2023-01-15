class MNode{
    key = null;
    sound = null;
    playTime = null;

    constructor(key, sound) {
        this.key = key;
        this.sound = sound;
    }

    play(){
        this.sound.currentTime = 0;
        this.sound.play();
    }
    playWTime(playTime){
        this.play()
        let t = new MNode(this.key,this.sound);
        t.playTime = playTime;
        return t;
    }
}

class Record {
    StarTime = Date.now();
    EndTime = Date.now();
    id = null;
    media = [];
    isRecording = false;
    parent = document;
    sBtn = document.createElement("button");
    stBtn = document.createElement("button");
    ptBtn = document.createElement("button");
    cBtn = document.createElement("button");
    ui = document.createElement("div");

    constructor(parent,ui, id) {
        this.parent = parent;
        this.id = id;
        this.ui = ui.cloneNode(true);
        this.ui.Logic = this;

        this.sBtn = this.ui.querySelector(".recStart");
        this.pBtn = this.ui.querySelector(".recPlay");
        this.stBtn = this.ui.querySelector(".recStop");
        this.cBtn = this.ui.querySelector(".recDel");
        this.data = this.ui.querySelector(".recData");

        this.sBtn.addEventListener("click",this.record);
        this.stBtn.addEventListener("click",this.stop);
        this.cBtn.addEventListener("click",this.clean);
        this.pBtn.addEventListener("click",this.btnPlay);

        this.ui.id = "rec" + this.id;
        this.parent.appendChild(this.ui);
    }

    record(){
        this.style.backgroundColor = "green";
        this.parentElement.Logic.isRecording = true;
        this.parentElement.Logic.StarTime = Date.now();
    }

    stop(){
        this.parentElement.Logic.sBtn.style.backgroundColor = "red";
        this.parentElement.Logic.isRecording = false;
        this.parentElement.Logic.EndTime = Date.now();
    }

    clean(){
        this.parentElement.Logic.media = [];
        this.parentElement.Logic.data.innerHTML = "";
    }

    playS(){
        if(this.media.length != 0){
            this.media.forEach(m => {
                setTimeout(()=>{
                    m.play()
                },m.playTime)
            })
        }
    }

    btnPlay(){
        this.parentElement.Logic.playS();
    }

}
let id = 2;
let tempRec = document.querySelector(".rec");
const recParent = document.querySelector("#records");
const addRec = document.querySelector("#newRec");
const playSelected = document.querySelector("#playSelected");
const stopSelected = document.querySelector("#stopSelected");
const delRec = document.querySelector("#delRec");
const metronomOn = document.querySelector("#metronomOn");
const metronomOff = document.querySelector("#metronomOff");
const metronomFreq = document.querySelector("#freq");
const chunkSize = document.querySelector("#chunkSize");


let records = [];
let intervals = [];
let metronom = new MNode(' ',document.querySelector("#s8"));
let inteval = null;

const mNodes = [
    new MNode('a',document.querySelector('#s1')),
    new MNode('s',document.querySelector('#s2')),
    new MNode('d', document.querySelector('#s3')),
    new MNode('q', document.querySelector('#s4')),
    new MNode('w', document.querySelector('#s5')),
    new MNode('e', document.querySelector('#s6')),
    new MNode('z', document.querySelector('#s7')),
    new MNode('x', document.querySelector('#s8')),
    new MNode('c', document.querySelector('#s9'))
]
const KeyToSound = {
    'a': mNodes[0],
    's': mNodes[1],
    'd': mNodes[2],
    'q': mNodes[3],
    'w': mNodes[4],
    'e': mNodes[5],
    'z': mNodes[6],
    'x': mNodes[7],
    'c': mNodes[8]
}
function stopSelectedLoop(){
    if(intervals.length != 0){
        for (let inerv of intervals) {
            clearInterval(inerv)
        }
    }
}
function playSelectedRecords() {
    let selected = document.querySelectorAll(".selected");
    let loops = document.querySelectorAll(".loop");
    selected.forEach(x=>{
        if(x.checked == true && x.parentElement.querySelector(".loop").checked == true){
            intervals.push(setInterval(()=>{
                x.parentElement.Logic.playS();
            },x.parentElement.Logic.EndTime - x.parentElement.Logic.StarTime))

        }
        else if(x.checked == true){
            x.parentElement.Logic.playS();
        }
    })
}
function onKeyPress(event) {
    let rec2 = records.filter(x => x.isRecording);
    // console.log(rec2)
    if(rec2.length != 0){
        for (let rec of rec2) {
            // console.log(rec.StarTime);
            try {
                const sound = KeyToSound[event.key]
                rec.media.push(sound.playWTime(Date.now() - rec.StarTime));
                rec.ui.querySelector(".recData").textContent += sound.key;
            }
            catch (e){/*console.log(e.message)*/}
        }
    }
    else{
        try {
            const sound = KeyToSound[event.key]
            sound.play()
        }
        catch (e){/*console.log(e.message)*/}
    }
}
function addNewRec(){
    records.push(new Record(recParent,tempRec,id));
    id ++;
}
function delRecord(){
    records.pop();
    recParent.removeChild(recParent.lastChild);
    id--;
}
// sessionStorage

addRec.addEventListener('click',addNewRec);
delRec.addEventListener('click',delRecord);
playSelected.addEventListener('click',playSelectedRecords);
stopSelected.addEventListener('click',stopSelectedLoop);
metronomOn.addEventListener('click', ()=>{
    interval = setInterval(()=>{
        metronom.play();
    },metronomFreq.value)
});
metronomOff.addEventListener('click', ()=>{
    clearInterval(interval);
});
document.addEventListener('keypress', onKeyPress);

delRecord()
delRecord()