const canvasLab6 = document.querySelector("#lab6Canvas");
let Olife = 200;

class Orb {
    //logic
    id = 0;
    life = 0;

    force = 0;

    ctx = canvasLab6.getContext("2d");

    radius = 0;
    x = 0;
    y = 0;

    vx = 0;
    vy = 0;

    isClicked = false;
    //ui
    //todo: colors array
    color = "#f66"

    constructor(id, life, ctx) {
        this.id = id;
        this.life = life;
        this.ctx = ctx;
        this.obj = new Path2D()

        this.isClicked = false;
        // this.force = Math.floor(Math.sqrt(this.life)/2);
        //todo: poprawa warunków
        if(this.life >= Olife/2 && this.life < Olife){
            this.color = "#0AF"
            this.force = Math.floor(Math.sqrt(this.life)/8)
        }
        if(this.life >= Olife/4 && this.life < Olife/2){
            this.color = "#A0F"
            this.force = Math.floor(Math.sqrt(this.life)/4)
        }

        this.radius = this.life/2;
        this.x = canvasLab6.width/2;
        this.y = canvasLab6.height/2;
        // Math.floor(Math.random() * ((this.force/10)-10) + 10)
        while(this.vx == 0){
            this.vx = Math.floor(Math.random() * ((this.force)+(this.force)));
        }
        while(this.vy == 0){
            this.vy = Math.floor(Math.random() * ((this.force)+(this.force)));
        }

    }

    draw(){

        this.obj = new Path2D();
        this.obj.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        this.ctx.fillStyle = this.color;
        this.ctx.fill(this.obj);
    }
    move(){
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.vy > canvasLab6.height - this.radius || this.y + this.vy < this.radius) {
            this.vy = -this.vy;
        }
        if (this.x + this.vx > canvasLab6.width - this.radius || this.x + this.vx < this.radius) {
            this.vx = -this.vx;
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
        this.generateOrbs()
    }

    generateOrbs(){
        for(this.orbsId; this.orbsId<20;this.orbsId++){
            //todo timeout/ async gen orbs?
            let l = Math.floor(Math.random() * (Olife-(Olife/2)) + (Olife/4));
            this.Orbs.push(new Orb(this.orbsId, l, this.ctx))
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
class Vector{
    speed = 2;
    direction = {
        //prawy góra
        x: 2,
        y: 2,
    }
}

let lab6Env = new Env()

function drawEnv(){
    lab6Env.ctx.clearRect(0, 0, lab6Env.dom.width, lab6Env.dom.height);
    lab6Env.reduceOrbs();
    lab6Env.Orbs.forEach((x)=>{
        lab6Env.Orbs.forEach((y)=>{
            if(y.id !== x.id){
                let ax,ay,res;
                res = 0;
                if(y.y === x.y){
                    res = y.y - x.y;

                }
                if(y.x === x.x){
                    res = y.x - x.x;
                }
                else{
                    ax = y.x - x.x;
                    ay = y.y - y.x;
                    res = Math.pow(ax,2) + Math.pow(ay,2);
                    res = Math.sqrt(res)
                }
                if(res<0)res *= -1;

                if(res < y.y){
                    y.ctx.beginPath();
                    y.ctx.moveTo(x.x,x.y)
                    y.ctx.lineTo(y.x,y.y)
                    y.ctx.closePath()
                    y.ctx.lineWidth = 4;
                    y.ctx.lineJoin = "round"
                    y.ctx.stroke()
                }
            }
        })
        x.draw()
        x.move()
    })
    // lab6Env.Orbs.forEach(x=>x.move())
    lab6Env.raf = window.requestAnimationFrame(drawEnv);
}


// lab6Env.dom.addEventListener("click",()=>{
    lab6Env.raf = window.requestAnimationFrame(drawEnv);
// })

// lab6Env.dom.addEventListener("click",(e)=>{
//     lab6Env.Orbs.forEach((x)=>{
//         if(lab6Env.ctx.isPointInPath(x.obj,e.offsetX,e.offsetY)){
//             // x.isClicked = true;
//             console.log(lab6Env.ctx.isPointInPath(x.obj,e.offsetX,e.offsetY))
//         }
//         else{
//             console.log(lab6Env.ctx.isPointInPath(x.obj,e.offsetX,e.offsetY))
//         }
//     })
// })
// lab6Env.dom.addEventListener("mouseout",()=>{
//     window.cancelAnimationFrame(()=>{
//         lab6Env.raf;
//     })
// });

// drawEnv()