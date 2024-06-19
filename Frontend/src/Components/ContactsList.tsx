import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ContactsForm from "./ContactsForm";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching contacts", error);
      });
  }, []);

  const handleDeleteContact = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/contacts/${id}`);
      setContacts((previousContacts) =>
        previousContacts.filter((contact) => contact._id !== id)
      );
    } catch (error) {
      console.log("Error deleting contact, ", error);
    }
  };

  return (
    <div className="list-container">
      <h1>Contacts</h1>
      <Link to={"/form/"}>
        <button className="btn-add">New Contact</button>
      </Link>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id} className="contact-item">
            {contact.name}
            <div className="contact-actions">
              <Link to={`/form/${contact._id}`}>
                <button className="btn-edit">Edit</button>
              </Link>
              <button
                className="btn-delete"
                onClick={() => handleDeleteContact(contact._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
