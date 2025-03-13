const add = (a: number, b: number): number => {
  return a + b;
};

console.log(add(10, 10));

function newAdd(a: number, b: number): number {
  return a + b;
}

console.log(newAdd(10, 10));

(function (): void {
  console.log('Hello, Madison');
})();

const throwError = (msg: string): string => {
  if (!msg) {
    throw new Error('There was no message...');
  }

  return msg;
};

console.log(throwError('Hello'));
//console.log(throwError());

const forecast = {
  date: new Date(),
  weather: 'sunny',
};

const logWeather = ({date, weather}: {date: Date; weather: string}): void => {
  console.log(date);
  console.log(weather);
};

logWeather(forecast);
