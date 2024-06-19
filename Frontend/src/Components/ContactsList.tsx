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

  return (
    <div>
      <h2>Contacts</h2>
      <Link to={"/form/"}>
        <button>New Contact</button>
      </Link>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name}
            <Link to={`/form/${contact._id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
