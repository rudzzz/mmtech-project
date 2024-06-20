const database = require("../Models/ContactsModel");

exports.getContacts = (request, response) => {
  const { page = 1, pageSize = 10 } = request.query;
  const limit = parseInt(pageSize);
  const skip = (parseInt(page) - 1) * limit;

  console.log(`Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

  database
    .find({})
    .skip(skip)
    .limit(limit)
    .exec((error, contacts) => {
      if (error) {
        return response
          .status(500)
          .json({ message: `Failed to fetch contacts, ${error.message}` });
      }

      database.count({}, (countError, totalCount) => {
        if (countError) {
          return response.status(500).json({
            message: `Failed to count contacts, ${countError.message}`,
          });
        }

        response.status(200).json({
          contacts: contacts,
          totalContacts: totalCount,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limit),
        });
      });
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
