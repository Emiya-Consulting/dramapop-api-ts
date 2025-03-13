let apples = 5;

apples = 10;
console.log(apples);

const now: Date = new Date();
console.log(now);

const bandMembers = ['Jisoo', 'Lisa', 'Jennie', 'Rosé'];
for (let i = 0; i < bandMembers.length; i++) {
  console.log(bandMembers[i]);
}

class Car {
  make = '';
  model = '';

  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

const car: Car = new Car('Hyundai', 'Tucson');
console.log(car);

const point: {x: number; y: number} = {
  x: 10,
  y: 20,
};

console.log(point);

const logNumber = (i: number): void => {
  console.log(i);
};

logNumber(12);

const agMembers = ['Suzuka', 'Rin', 'Kanon', 'Mizyu'];

agMembers.forEach(element => {
  console.log(element);
});
