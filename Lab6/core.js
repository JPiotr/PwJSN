const canvasLab6 = document.querySelector("#lab6Canvas");
const c6Start = document.querySelector("#lab6Start");
const c6Stop = document.querySelector("#lab6Stop");
const c6rangeW = document.querySelector("#CWidth");
const c6rangeH = document.querySelector("#CHeight");
const hV = document.querySelector("#hV");
const wV = document.querySelector("#wV");
const fieldsV = document.querySelector("#lab6FV");
const orbsNumber = document.querySelector("#orbsNum");
const LON = document.querySelector("#LOrbsNum");
const BON = document.querySelector("#BOrbsNum");
const SON = document.querySelector("#SOrbsNum");
const MON = document.querySelector("#MOrbsNum");
const FDiv = document.querySelector("#ForceDiv");
const MForce = document.querySelector("#MForce");

let FdivNum = FDiv.value;
let MF = MForce.value;
let InitialOrbsNumber = orbsNumber.value;
let Olife = canvasLab6.width/10;

let Oforce = Olife/FdivNum;

const Oforces = {
    Large : {
        max: Oforce,
        min: (Oforce/4)+1,
        color : "#fd0606",
        colorF : "rgba(253,6,6,0.65)",
        colorF2 : "rgba(253,6,6,0.34)"
    },
    Big   : {
        max: Oforce/4,
        min: (Oforce/8)+1,
        color : "#ffae00",
        colorF : "rgba(255,174,0,0.65)",
        colorF2 : "rgba(255,174,0,0.34)"
    },
    Small : {
        max: Oforce/8,
        min: (Oforce/16)+1,
        color : "#397eff",
        colorF : "rgba(57,126,255,0.65)",
        colorF2 : "rgba(57,126,255,0.34)"
    },
    Mini  : {
        max: Oforce/16,
        min: Oforce/32,
        color : "#00fa74",
        colorF : "rgba(0,250,116,0.65)",
        colorF2 : "rgba(0,250,116,0.34)",
    },
    Mouse : {
        color : "#1dff04",
        colorF : "rgba(4,255,226,0.65)",
        colorF2 : "rgba(255,4,196,0.34)"
    }
}
let LOnum = Math.floor(InitialOrbsNumber/20);
let BOnum = Math.floor(InitialOrbsNumber/5);
let SOnum = Math.floor(InitialOrbsNumber/4);
let MOnum = Math.floor(InitialOrbsNumber/2);

LON.value = LOnum;
BON.value = BOnum;
MON.value = MOnum;
SON.value = SOnum;

let FieldsDevControl = false;

// more life = more force = less speed
class Orb {
    //logic
    id = 0;
    life = 0;
    force = 0;
    speed = 0;
    type = Oforces.Big;
    ctx = canvasLab6.getContext("2d");
    obj = new Path2D();
    objF = new Path2D();
    objF2 = new Path2D();
    radius = 0;
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    isClicked = false;

    constructor(id, life, ctx) {
        this.id = id;
        this.life = life;
        this.ctx = ctx;
        // this.ctx = canvasLab6.getContext("2d");;
        this.obj = new Path2D()
        this.isClicked = false;

        this.setType();
        this.calculateForce();

        this.radius = this.life/2;

        this.setRandomPosition();
        this.calculateSpeed();

    }
    setType(){
        if(this.life <= Olife && this.life > (Olife/2)){
            this.type = Oforces.Large;
            return;
        }
        if(this.life <= (Olife/2)+1 && this.life > (Olife/4)){
            this.type = Oforces.Big;
            return;
        }
        if(this.life <= (Olife/4)+1 && this.life > (Olife/8)){
            this.type = Oforces.Small;
            return;
        }
        if(this.life <= (Olife/8)+1 && this.life > (Olife/16)){
            this.type = Oforces.Mini;
        }
    }
    calculateForce(){
        this.force = Math.floor(
            (Math.random() * (this.type.max - this.type.min)) + this.type.min
        );
    }
    calculateSpeed(){
        this.speed = ((Oforce - this.force)/10);

        this.vx = this.calculateVector();
        this.vy = this.calculateVector();
    }
    calculateVector(){
        return Math.floor((Math.random() * ((Oforce/20) - this.speed)) + this.speed);
    }
    setRandomPosition(){
        this.x = Math.floor(
            (Math.random() * ((canvasLab6.width - this.radius) - this.radius)) + this.radius
        );
        this.y = Math.floor(
            (Math.random() * ((canvasLab6.height - this.radius) - this.radius)) + this.radius
        );
    }

    draw(){
        this.obj = new Path2D();
        this.objF = new Path2D();
        this.objF2 = new Path2D();

        this.obj.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        this.objF.arc(this.x,this.y,this.force+this.radius,0,Math.PI*2,true);
        this.objF2.arc(this.x,this.y,this.force+this.life ,0,Math.PI*2,true);
        if(FieldsDevControl){
            this.ctx.fillStyle = this.type.colorF2;
            this.ctx.fill(this.objF2);

            this.ctx.fillStyle = this.type.colorF;
            this.ctx.fill(this.objF);
        }

        this.ctx.fillStyle = this.type.color;
        this.ctx.fill(this.obj);
    }
    move(){
        //todo: fix border collision
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.vy > canvasLab6.height - this.radius || this.y + this.vy < this.radius) {
            this.vy = -this.vy;
        }
        if (this.x + this.vx > canvasLab6.width - this.radius || this.x + this.vx < this.radius) {
            this.vx = -this.vx;
        }
    }

    detectAnotherOrb(ao){
        if(ao.id !== this.id){
            let ax,ay,res;
            res = 0;
            // if(y.y === x.y){
            //     res = y.y - x.y;
            //
            // }
            // else if(y.x === x.x){
            //     res = y.x - x.x;
            // }
            // else{
            ax = ao.x - this.x;
            ay = ao.y - this.y;
            res = Math.pow(ax,2) + Math.pow(ay,2);
            res = Math.sqrt(res)+this.radius
            // }
            if(res<0)res *= -1;

            // if(res <= x.force && res <= y.force){
            if(res <= ((this.force+this.life)+(ao.force+ao.life))){
                this.ctx.beginPath();
                this.ctx.moveTo(this.x,this.y);
                this.ctx.lineTo(ao.x,ao.y);
                this.ctx.closePath();
                this.ctx.lineWidth = 2;
                this.ctx.lineJoin = "round"
                this.ctx.stroke();
                //test
                if(this.id === -1){
                    this.interact(ao)
                }
            }
        }
    }

    interact(ao = new Orb(-2,10,null)){
        if(this.force > ao.force){
            // if(ao.x > this.x){
            //     ao.vx += this.force/8;
            // }
            // else{
            //     ao.vx -= this.force/8;
            // }
            // if(ao.y > this.y){
            //     ao.vy += this.force/8;
            // }
            // else {
            //     ao.vy -= this.force / 8;
            // }
            // setTimeout(()=>{
            //     ao.calculateSpeed()
            // },100)
            //second solution
            if(ao.x < this.x+this.radius || ao.x > this.x){
                // ao.vx += this.force/8;
                ao.vx = -ao.vx
            }
            else{
                // ao.vx -= this.force/8;
            }
            if(ao.y < this.y+this.radius || ao.y > this.y){
                // ao.vy += this.force/8;
                ao.vy = -ao.vy;
            }
            else {
                // ao.vy -= this.force / 8;
            }
            // setTimeout(()=>{
            //     ao.calculateSpeed()
            // },100)
        }
        else{
            this.vx += ao.x/2;
            this.vy += ao.y/2;
        }
    }
}
class Env{
    //logic
    Orbs = [];
    orbsId = 0;
    raf = null;
    //ui
    dom = document.createElement("canvas");
    ctx = document.createElement("canvas").getContext("2d");

    constructor() {
        this.dom = canvasLab6;
        this.ctx = this.dom.getContext("2d");
        // this.generateOrbs()
    }

    generateOrbs(){
        // for(this.orbsId; this.orbsId<InitialOrbsNumber;this.orbsId++){
        //     let l = Math.floor(Math.random() * (Olife-(Olife/32)) + (Olife/32));
        //     this.Orbs.push(new Orb(this.orbsId, l, this.ctx))
        //     // this.Orbs.push(new Orb(this.orbsId, 20, this.ctx))
        // }
        for(let i = 0; i < LOnum; i++){
            let l = Math.floor(Math.random() * (Olife-(Olife/2)) + (Olife/2));
            this.Orbs.push(new Orb(this.orbsId, l, this.ctx));
            this.orbsId++;
        }
        for(let i = 0; i < BOnum; i++){
            let l = Math.floor(Math.random() * ((Olife/2)-(Olife/4)) + (Olife/4));
            this.Orbs.push(new Orb(this.orbsId, l, this.ctx));
            this.orbsId++;
        }
        for(let i = 0; i < SOnum; i++){
            let l = Math.floor(Math.random() * ((Olife/4)-(Olife/8)) + (Olife/8));
            this.Orbs.push(new Orb(this.orbsId, l, this.ctx));
            this.orbsId++;
        }
        for(let i = 0; i < MOnum; i++){
            let l = Math.floor(Math.random() * ((Olife/8)-(Olife/16)) + (Olife/16));
            this.Orbs.push(new Orb(this.orbsId, l, this.ctx));
            this.orbsId++;
        }
    }

    reduceOrbs(){
        this.Orbs.forEach(x=>{
            if(x.isClicked){
                this.Orbs.splice(x.id,1)
            }
        })
    }

}



//mouse Orb
let MOrb = new Orb(-1,20,canvasLab6.getContext("2d"));
MOrb.type = Oforces.Mouse;
MOrb.force = parseInt(MF)
MOrb.vx = 0;
MOrb.vy = 0;

let lab6Env = new Env()

function drawEnv(){
    lab6Env.ctx.clearRect(0, 0, lab6Env.dom.width, lab6Env.dom.height);
    // lab6Env.reduceOrbs();
    lab6Env.Orbs.forEach((x)=>{
        lab6Env.Orbs.forEach((y)=>{
            x.detectAnotherOrb(y)
            // x.interact(y)
        })
        MOrb.detectAnotherOrb(x)
        // MOrb.interact(x)
        x.draw()
        x.move()
    })
    // lab6Env.ctx.fillStyle = "rgba(234,60,238,0.42)";
    // lab6Env.ctx.fill(MOrb)
    MOrb.draw();
    lab6Env.raf = window.requestAnimationFrame(drawEnv);
}

//todo: mouse clicked in/out
canvasLab6.addEventListener("mousemove",(e)=>{
    MOrb.x = e.offsetX;
    MOrb.y = e.offsetY;
    MOrb.force = parseInt(MF);
})
MForce.addEventListener("input",(e)=>{
    MF = e.target.value;
})
c6Start.addEventListener("click",()=>{
    if(lab6Env.raf > 0){
        window.cancelAnimationFrame(lab6Env.raf)
    }
    lab6Env = new Env();
    lab6Env.generateOrbs();
    lab6Env.raf = window.requestAnimationFrame(drawEnv);
})
c6Stop.addEventListener("click",()=>{
    window.cancelAnimationFrame(lab6Env.raf);
})
c6rangeW.addEventListener("input",(e)=>{
    canvasLab6.width = e.target.value;
    Olife = canvasLab6.width/10;
    Oforce = Olife/2;
    wV.innerHTML = "W: "+ e.target.value;
})
c6rangeH.addEventListener("input",(e)=>{
    canvasLab6.height = e.target.value;
    hV.innerHTML = "H: "+ e.target.value;
})
fieldsV.addEventListener("click",()=>{
    if(fieldsV.checked){
        FieldsDevControl = true;
        return;
    }
    FieldsDevControl = false;
})
orbsNumber.addEventListener("input",(e)=>{
    InitialOrbsNumber = e.target.value;
    LOnum = Math.floor(InitialOrbsNumber/20);
    LON.value = LOnum;
    BOnum = Math.floor(InitialOrbsNumber/5);
    BON.value = BOnum;
    SOnum = Math.floor(InitialOrbsNumber/4);
    SON.value = SOnum;
    MOnum = Math.floor(InitialOrbsNumber/2);
    if((LOnum+BOnum+SOnum+MOnum) < InitialOrbsNumber){
        MOnum += InitialOrbsNumber-(LOnum+BOnum+SOnum+MOnum)
    }
    MON.value = MOnum;
})
FDiv.addEventListener("input",(e)=>{
    FdivNum = e.target.value;
    Oforce = Olife/FdivNum;
})