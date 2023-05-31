const HelloDecorator = (target: any) => {
  target.prototype.sayHello = function () {
      return 'hello'; 
  };
  target.prototype.hello = 'world';
  target.prototype.decorator = 'decorator';
  return target;
};
const HelloDecorator2 = (target: any) => {
  
  return class extends target {
      sayHello2() {
          return 'hello2';
      }
      hello = 'world2';
      decorator2 = 'decorator2';
  };
};

@HelloDecorator2
@HelloDecorator
export class Hello {
  [key: string]: any;

  hello: string;

  constructor() {
      this.hello = 'test';
  }
}

let hello = new Hello();
console.log(hello.sayHello());
console.log(hello.hello);
console.log(hello.decorator);

console.log(hello.sayHello());
console.log(hello.hello);
console.log(hello.decorator2);