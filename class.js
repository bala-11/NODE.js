class Car {
    constructor(name) {
        this.brand = name
    }

    present(){
        return `this is my new car ${this.brand}`
    }
}

class Model extends Car {
    constructor(name , mod) {
        super(name)
        this.model = mod
    }
    show(){
        return ` ${this.present()} and it is my model ${this.model}\n`
    }
}

const myCar = new Model("Ford","Mustang")
console.log(myCar.show());



// const myCar = new Car('Mercedes')
// console.log(myCar.present());
