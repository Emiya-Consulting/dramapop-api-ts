// Use "tags" to allow for type checking of custom types, in this case "kind" acts as the tag.
// This makes the Shape type created later a "tagged union".

interface Square {
  kind: 'square';
  width: number;
}

interface Rectangle {
  kind: 'rectangle';
  height: number;
  width: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape.kind === 'rectangle') {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

const myRect: Shape = {kind: 'square', width: 100};

console.log(calculateArea(myRect));

class NewSquare {
  width: number;
  constructor(width: number) {
    this.width = width;
  }
}

class NewRectangle extends NewSquare {
  height: number;
  constructor(width: number, height: number) {
    super(width);
    this.height = height;
  }
}

type NewShape = NewSquare | NewRectangle;

function calculateNewArea(shape: NewShape) {
  if (shape instanceof NewRectangle) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
