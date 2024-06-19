import { useState } from "react";
import axios from "axios";

const ContactsForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newContact = { name, email, phone };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contacts",
        newContact
      );
      console.log("New contact: ", response.data);
    } catch (error) {
      console.log("Error adding new contact: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="contact-name">Name</label>
        <input
          type="text"
          required
          name="name"
          value={name}
          id="contact-name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="contact-email">Email</label>
        <input
          type="email"
          required
          name="email"
          value={email}
          id="contact-email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="contact-phone">Phone</label>
        <input
          type="phone"
          required
          name="phone"
          value={phone}
          id="contact-phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ContactsForm;
