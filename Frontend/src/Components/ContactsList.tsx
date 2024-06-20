import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/contacts?page=${currentPage}&limit=${contactsPerPage}`
      )
      .then((response) => {
        const { contacts, totalContacts, totalPages } = response.data;
        setContacts(contacts);
        setTotalContacts(totalContacts);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.log("Error fetching contacts", error);
      });
  }, [currentPage, contactsPerPage]);

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
      setTotalContacts(totalContacts - 1);
      setTotalPages(Math.ceil((totalContacts - 1) / contactsPerPage));
    } catch (error) {
      console.log("Error deleting contact", error);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  return (
    <div className="list-container">
      <h1>Contacts</h1>
      <Link to={"/form/"}>
        <button className="btn-add">New Contact</button>
      </Link>
      <ul>
        {contacts.length ? (
          contacts.map((contact) => (
            <li key={contact._id} className="contact-item">
              {contact.name}
              <div className="contact-actions">
                <Link to={`/form/${contact._id}`}>
                  <button className="btn-edit">Edit</button>
                </Link>
                <Link to={`/details/${contact._id}`}>
                  <button className="btn-details">Details</button>
                </Link>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteContact(contact._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <h2>No contacts registered</h2>
        )}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ContactsList;
