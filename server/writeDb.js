const fs = require('fs');
const faker = require('faker');
const uuid = require('uuid/v4');

const writeFakeData = () => [...Array(10).keys()]
  .map(id => ({
    id: uuid(),
    price: faker.commerce.price(),
    topping: faker.lorem.word(),
}));

fs.writeFileSync('db.json', JSON.stringify({ products: writeFakeData() }));
