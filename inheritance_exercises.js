Function.prototype.inheritsS = function(parentClass){
    function Surrogate(){}
    Surrogate.prototype = parentClass.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
}

Function.prototype.inherits = function(parentClass){
    this.prototype = Object.create(parentClass.prototype);
}

function MovingObject () {
    this.name = "test";
}

MovingObject.prototype.test = function(){
    console.log("works!");
}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

let ship = new Ship();
ship.test();