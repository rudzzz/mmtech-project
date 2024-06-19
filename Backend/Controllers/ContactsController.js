const database = require("../Models/ContactsModel");

exports.getContacts = (request, response) => {
  database.find({}, (error, contacts) => {
    if (error) {
      return response
        .status(500)
        .json({ message: `Failed to create contact, ${error.message}` });
    }
    response.status(200).json(contacts);
  });
};

exports.getContactByid = (request, response) => {
  const { id } = request.params;
  database.findOne({ _id: id }, (error, contact) => {
    if (error) {
      return response
        .status(500)
        .json({ message: `Failed to fetch contact: ${error.message}` });
    }

    if (!contact) {
      return response.status(404).json({ message: "Contact not found." });
    }

    response.status(200).json(contact);
  });
};

exports.createContact = (request, response) => {
  const { name, email, phone } = request.body;
  if (!name || !email || !phone) {
    return response
      .status(400)
      .json({ message: "Name, email and phone are required" });
  }

  database.insert({ name, email, phone }, (error, contact) => {
    if (error) {
      return response
        .status(500)
        .json({ message: `Failed to create contact, ${error.message}` });
    }
    response.status(201).json(contact);
  });
};

exports.updateContact = (request, response) => {
  const { id } = request.params;
  const { name, email, phone } = request.body;

  if (!name || !email || !phone) {
    return response
      .status(400)
      .json({ message: "Name, email and phone are required" });
  }

  database.update(
    { _id: id },
    { $set: { name, email, phone } },
    {},
    (error) => {
      if (error) {
        return response
          .status(500)
          .json({ message: `Failed to update contact, ${error.message}` });
      }
      response.status(200).json({ message: "Contact updated" });
    }
  );
};

exports.deleteContact = (request, response) => {
  const { id } = request.params;

  database.remove({ _id: id }, {}, (error) => {
    if (error) {
      return response
        .status(500)
        .json({ message: `Failed to delete contact, ${error.message}` });
    }
    response.status(200).json({ message: "Contact deleted" });
  });
};
