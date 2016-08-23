var faker = require('faker');

function generateProducts() {
  var users = [];

  for (var id = 0; id < 130; id++) {
    users.push({
      id: id,
      name: faker.name.findName(),
      email: faker.internet.email(),
      age: Math.floor(Math.random() * 80),
      birthday: faker.date.past(),
      status: Math.floor(Math.random() * 4)
    });
  }

  return {
    users: users
  };
}

module.exports = generateProducts;
