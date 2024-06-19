import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ContactsForm from "./Components/ContactsForm";
import ContactsList from "./Components/ContactsList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactsList />} />
        <Route path="/form" element={<ContactsForm />} />
        <Route path="/form/:id" element={<ContactsForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
