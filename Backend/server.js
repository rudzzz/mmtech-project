const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactsRoutes = require("./Routes/ContactsRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", contactsRoutes);

app.listen(3000, () => {
  console.log(`Server running at port 3000`);
});
