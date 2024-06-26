import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ContactsForm = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/contacts/${id}`)
        .then((response) => {
          const { name, email, phone } = response.data;
          setName(name);
          setEmail(email);
          setPhone(phone);
        })
        .catch((error) => {
          console.log("Error fetching data from id: ", error);
        });
    }
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newContact = { name, email, phone };

    try {
      if (id) {
        const response = await axios.put(
          `http://localhost:3000/api/contacts/${id}`,
          newContact
        );

        console.log("Updated contact: ", response.data);
        setSuccessMessage("Contact updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/contacts",
          newContact
        );

        console.log("New contact: ", response.data);
        setSuccessMessage("New contact created successfully!");
      }
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log("Error adding new contact: ", error);
      setErrorMessage("Failed to update contact.");
    }
  };

  return (
    <div className="form-container">
      {successMessage && (
        <div className="message success-message">
          <p>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="message error-message">
          <p>{errorMessage}</p>
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="contact-name">Name</label>
        <input
          type="text"
          required
          maxLength={45}
          name="name"
          value={name}
          id="contact-name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="contact-email">Email</label>
        <input
          type="email"
          required
          maxLength={35}
          name="email"
          value={email}
          id="contact-email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="contact-phone">Phone</label>
        <input
          type="phone"
          required
          maxLength={15}
          name="phone"
          value={phone}
          id="contact-phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="form-btn">
          <Link to={"/"}>
            <button className="btn-edit">Back</button>
          </Link>

          <button className="btn-add" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactsForm;
