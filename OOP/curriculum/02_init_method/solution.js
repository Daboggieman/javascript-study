class Car {
  constructor(make, model, year = 2024, mileage = 0) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.mileage = mileage;
  }

  drive(miles) {
    this.mileage += miles;
  }
}

if (require.main === module) {
  const car1 = new Car("Toyota", "Corolla", 2020);
  const car2 = new Car("Honda", "Civic");             // uses default year
  console.log(car1.year, car2.year);                   // 2020 2024

  car1.drive(50);
  car1.drive(100);
  console.log(car1.mileage);                           // 150
}
