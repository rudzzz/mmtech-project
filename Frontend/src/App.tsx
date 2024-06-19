import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ContactsForm from "./Components/ContactsForm";
import ContactsList from "./Components/ContactsList";
import ContactsDetail from "./Components/ContactsDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactsList />} />
        <Route path="/form" element={<ContactsForm />} />
        <Route path="/form/:id" element={<ContactsForm />} />
        <Route path="/details/:id" element={<ContactsDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
