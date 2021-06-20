// Define HTML title
const setTitle = 'Electric Vehicle Class';
window.document.title = setTitle;

// Create range array and log sum of range
const range = (start, end) => Array.from({length: end-start+1}, (_, i) => i + start);
const sum = numbers => numbers.reduce((a, b) => a + b);
console.log(sum(range(0, 1)));

// Construct car class, define subclass including getters and setters
class Car {
    constructor() {
        this._kilometer = 0;
    }
}

class ElectricVehicle extends Car {
    constructor(battery = 100) {
        super()
        this._battery = battery
    }
    get kilometer() {
        return this._kilometer;
    }
    get battery() {
        return this._battery;
    }
    set changeKilometer(newKilometer) {
        this._kilometer += newKilometer;
    }
    set changeBattery(newBattery) {
        (newBattery < 0) ? this._battery += newBattery : this._battery = newBattery; 
    }
    hasBattery() {
        const str = `${(this.battery > 70) ? 'good' : (this.battery) > 50 ? 'ok' : (this.battery) > 30 ? 'recharge recommended' : 'recharge immediately!'}`;
        console.log(str);
    }
    drive() {
        (this._battery > 1) ? (this.changeKilometer = +1) & (this.changeBattery = -1) : console.log('recharge first!');
    }
    charge() {
        this.changeBattery = 100;
    }
    status() {
        console.log(`Battery: ${this.battery}, Kilometer: ${this.kilometer}`);
    }
}

// Test subclass
const tesla = new ElectricVehicle();
console.log(tesla);
tesla.status();
tesla.drive();
tesla.status();
tesla.drive();
tesla.drive();
tesla.status();
tesla.drive();
tesla.hasBattery();
tesla.changeBattery = 55;
tesla.hasBattery();
tesla.changeBattery = 25;
tesla.hasBattery();
tesla.status();
console.log('after only 4 km !!!!'); // ;-)
tesla.charge();
tesla.status();
tesla.changeBattery = 0;
tesla.drive();
tesla.status();