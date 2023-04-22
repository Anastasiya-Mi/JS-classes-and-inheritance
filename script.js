// base class
function Parent(value) { 
    this.value = value;
}

Parent.prototype.checkout = function () {
  if (Number.isInteger(this.value)) {
    return "number";
  } else {
    return "string";
  }
};

Parent.prototype.get = function () {
  return this.value;
};

Parent.prototype.plus = function (...args) {
  for (let element of args) {
    this.value += element;
  }
  return this.value;
};

Parent.prototype.minus = function (...args) {
  if (this.checkout() === "number") {
    for (let element of args) {
      this.value -= element;
    }
    return this.value;
  } else if (this.checkout() === "string") {
    this.value = this.value.slice(0, 0 - args[0]);
    return this.value;
  }
};

Parent.prototype.multiply = function (args) {
  if (this.checkout() === "number") {
    this.value = this.value * args;
    return this.value;
  } else if (this.checkout() === "string") {
    this.value = this.value.repeat(args);
    return this.value;
  }
};

Parent.prototype.divide = function (args) {
  if (this.checkout() === "number") {
    this.value = Math.trunc(this.value / args);
    return this.value;
  } else if (this.checkout() === "string") {
    const k = Math.floor(this.value.length / args);
    this.value = this.value.slice(0, k);
    return this.value;
  }
};

//ES6

class IntBuilder extends Parent {
  constructor(value) {
    super(Parent);
    if (Number.isInteger(value)) {
      this.value = value;
    } else {
      this.value = 0;
    }
  }

  static random(from, to) {
    return Math.floor(Math.random() * (from - to)) + from;
  }

  mod(args) {
    return (this.value = this.value % args);
  }
}

let intBuilder = new IntBuilder(30);

// console.log(intBuilder.plus(2, 3, 2));
// console.log(intBuilder.minus(1, 2));
// console.log(intBuilder.multiply(2));
// console.log(intBuilder.divide(4));
// console.log(intBuilder.mod(3));
// console.log(intBuilder.get());
// console.log(IntBuilder.random(10, 100));

// ES5

function StringBuilder(value) {
  Parent.call(value);
  if (typeof value === "string") {
    this.value = value;
  } else if(value == undefined){
    this.value = "";
  }
};

StringBuilder.prototype = Object.create(Parent.prototype);

StringBuilder.prototype.remove = function(args){
    this.value = this.value.split(args).join('');
    return this.value;
}

StringBuilder.prototype.sub = function(from, to){
    this.value = this.value.substr(from,to);
    return this.value;
}

let strBuilder = new StringBuilder('Hello');

// console.log(strBuilder.plus(' all', '!'));
// console.log(strBuilder.minus(4));
// console.log(strBuilder.multiply(3));
// console.log(strBuilder.divide(4));
// console.log(strBuilder.remove('l'));
// console.log(strBuilder.sub(1, 1));
// console.log(strBuilder.get());
