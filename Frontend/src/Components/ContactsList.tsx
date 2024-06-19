import { useEffect, useState } from "react";
import axios from "axios";

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
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
