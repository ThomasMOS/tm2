const { faker } = require("@faker-js/faker");
let database = {
  users: [],
  tasks: [],
};

for (let x = 1; x <= 3; x++) {
  let id = x;
  let gender = faker.name.sexType();
  let name  = faker.name.firstName(gender) + ' ' + faker.name.lastName() ;
  let email = faker.helpers.unique(faker.internet.email, [name]);
  let password = faker.internet.password(8, false, /\w/);

  database.users.push({
    id,
    name,
    email,
    password,
  });
}



for (let x = 1; x <= 3; x++) {
  let id = x;
  let userId = 1;
  let name = faker.lorem.word({ length: { min: 5, max: 7 }, strategy: "fail" });
  let date = faker.date.soon();
  let description = faker.lorem.paragraph();
  let status = faker.helpers.arrayElement(["T-Do", "In Progress", "Completed"]);
  database.tasks.push({
    id,
    userId,
    name,
    date,
    description,
    status
  });
}


console.log(JSON.stringify(database));