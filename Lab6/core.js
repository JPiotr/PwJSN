const canvasLab6 = document.querySelector("#lab6Canvas");

let OID = 0

class Orb {
    //logic
    id = 0;
    life = 100;
    force = 50;

    x = 0;
    y = 0;

    //ui
    path = new Path2D();
}
class Env{
    //logic
    Orbs = [];

    //ui

}
class Vector{
    speed = 2;
    direction = {
        //prawy góra
        x: 2,
        y: 2,
    }
}


let circle = new Path2D()
canvasLab6.getContext();