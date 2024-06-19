const express = require("express");
const router = express.Router();
const contactsController = require("../Controllers/ContactsController");

router.get("/contacts", contactsController.getContacts);
router.get("/contacts/:id", contactsController.getContactByid);
router.post("/contacts", contactsController.createContact);
router.put("/contacts/:id", contactsController.updateContact);
router.delete("/contacts/:id", contactsController.deleteContact);

module.exports = router;
