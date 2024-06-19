const DataStore = require("nedb");
const database = new DataStore({ filename: "contacts.db", autoload: true });

module.exports = database;
