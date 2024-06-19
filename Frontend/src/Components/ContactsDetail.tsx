import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ContactsDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/contacts/${id}`
        );
        setContact(response.data);
      } catch (error) {
        setError("Error fetching contact details");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="contact-detail-container">
      {contact ? (
        <>
          <h1>Contact Detail</h1>
          <p>
            <strong>Name: </strong> {contact.name}
          </p>
          <p>
            <strong>Email: </strong> {contact.email}
          </p>
          <p>
            <strong>Phone: </strong> {contact.phone}
          </p>
        </>
      ) : (
        <p>No contact found</p>
      )}
      <Link to={"/"}>
        <button className="btn-edit">Back</button>
      </Link>
    </div>
  );
};

export default ContactsDetail;
