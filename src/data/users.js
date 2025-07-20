// data/users.js
const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    email: "admin1@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    email: "admin2@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    email: "user1@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    email: "user2@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 5,
    email: "user3@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 6,
    email: "user4@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "user",
    created_at: new Date(),
    updated_at: new Date(),
  }
];

module.exports = { users };
