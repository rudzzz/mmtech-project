const database = require("../Models/ContactsModel");

exports.getContacts = async (request, response) => {
  database.find({}, (error, contacts) => {
    if (error) {
      return response
        .status(500)
        .json({ message: `Failed to fetch contacts, ${error.message}` });
    }

    response.status(200).json(contacts);
  });
};

exports.createContact = async (request, response) => {
  const { name, email, phone } = request.body;
  if (!name || !email || !phone) {
    return response
      .status(400)
      .json({ message: "Name, email and phone are required" });
  }

  database.insert({ name, email, phone }, (error, contact) => {
    if (error) {
      return response.status(500).json({ message: "Failed to create contact" });
    }

    response.status(201).json(contact);
  });
};
