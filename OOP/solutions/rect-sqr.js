class Rectangle {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    // no need to store area -- the class already has a function that
    // calculates it; just return the area from that value and save to output.json

    if (this.height <= 0) {
      throw new Error("A dimension of the Rectangle cannot be ZERO(0) or have a negative value (-x)");
    }
    if (this.width <= 0) {
      throw new Error("A dimension of the Rectangle cannot be ZERO(0) or have a negative value (-x)");
    }
    if (this.height === this.width) {
      // return this.side = this.width
      throw new Error("values given are dimensions for a square, NOT a rectangle");
    }
  }

  area() {
    return this.height * this.width;
  }

  perimeter() {
    return 2 * (this.height + this.width);
  }

  describe() {
    return `"Rectangle ${this.width}x${this.height}"`;
  }
}

class Square extends Rectangle {
  constructor(side) {
    // NOTE: in JS a derived-class constructor MUST call super(...) before
    // touching `this`. The original Python never called Rectangle.__init__,
    // either (Square handles its own data) -- so this stays faithful, but
    // `new Square(4)` throws "Must call super constructor in a derived class".
    // See the quest answer oop_rectangle_default_args for the proper form.
    this.side = side;
  }

  area() {
    return this.side * 2;
  }

  perimeter() {
    return 2 * (this.side + this.side);
  }
}

// add the json append function when needed
// addToJson(filepath, record) { pass }

const r = new Rectangle(4, 5);
console.log(r.area(), r.perimeter(), r.describe());

const s = new Square(4);

console.log(s.area(), s.perimeter());
console.log(s instanceof Rectangle);
