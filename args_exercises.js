function sum(...args){
    let sum = 0;
    args.forEach((arg) => {
        sum += arg;
    });
    return sum;
}
console.log( sum(1,2,3) );

function sumA(){
    let sum = 0;
    for(let i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    return sum;
}
console.log( sumA(1,2,3,4,5) );

Function.prototype.myBindA = function(context, ...bindArgs){
    const func = this;
    return function (...callArgs){
        const args = bindArgs.concat(callArgs);
        debugger
        return func.apply(context, bindArgs.concat(callArgs));
    }
}

Function.prototype.myBind = function(context){
    const args = [];
    for (let i = 1; i < arguments.length; i++) args.push(arguments[i]);
    const func = this;
    return function(){
        for (let i = 0; i < arguments.length; i++) args.push(arguments[i]);
        
        return func.apply(context, args);
    }
}

class Cat {
    constructor(name) {
      this.name = name;
    }
  
    says(sound, person) {
      console.log(`${this.name} says ${sound} to ${person}!`);
      return true;
    }
  }
  
  class Dog {
    constructor(name) {
      this.name = name;
    }
  }
  
  const markov = new Cat("Markov");
  const pavlov = new Dog("Pavlov");
  
  markov.says("meow", "Ned");
  // Markov says meow to Ned!
  // true
  
  // bind time args are "meow" and "Kush", no call time args
  markov.says.myBind(pavlov, "meow", "Kush")();
  // Pavlov says meow to Kush!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "a tree"
  markov.says.myBind(pavlov)("meow", "a tree");
  // Pavlov says meow to a tree!
  // true
  
  // bind time arg is "meow", call time arg is "Markov"
  markov.says.myBind(pavlov, "meow")("Markov");
  // Pavlov says meow to Markov!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "me"
  const notMarkovSays = markov.says.myBind(pavlov);
  notMarkovSays("meow", "me");
  // Pavlov says meow to me!
  // true

  function curry(numArgs) {
    const nums = [];
    // let count = numArgs;
    return function _curriedAdd (num1) {
      nums.push(num1);
      // count--;
      if (nums.length === numArgs) {
      // if (count === 0) {
        const result = nums.reduce((acc, ele) => {
          return acc + ele;
        })
        console.log(result);
      } else {
        return _curriedAdd;
      }
    }
  }

const addition = curry(4);
addition(5)(30)(20)(1); // => 56

//using apply
Function.prototype.curry = function(numArgs) {
  const nums = [];
  const ogFunc = this;
  return function _curried (arg) {
    nums.push(arg);
    if (nums.length === numArgs) {
      return ogFunc.apply(null, nums) //context part doesn't really matter because the function it's applied on does not use "this";
    } else {
      return _curried;
    }
  }
}

//using "..."
Function.prototype.curryS = function (numArgs) {
  const nums = [];
  const ogFunc = this;
  return function _curried(arg) {
    nums.push(arg);
    if (nums.length === numArgs) {
      return ogFunc(...nums) 
    } else {
      return _curried;
    }
  }
}


function sumThree(num1, num2, num3) {
  console.log(this);
  return num1 + num2 + num3;
}
//console.log(sumThree(4, 20, 6)); // == 30

// you'll write `Function#curry`!
let f1 = sumThree.curryS(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30
console.log(f1);

let f2 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f2 = f2(4); // [Function]
f2 = f2(20); // [Function]
f2 = f2(6); // = 30
console.log(f2);