const request = require("supertest");
const app = require("../server");

describe("Contacts API", () => {
  let createdContactId;

  beforeAll(async () => {
    const newContact = {
      name: "João da Silva",
      email: "joaosilva@example.com",
      phone: "40028922",
    };

    const response = await request(app).post("/api/contacts").send(newContact);

    if (response.status === 201) {
      createdContactId = response.body._id;
    }
  });

  it("should fetch contacts with pagination", async () => {
    const response = await request(app).get("/api/contacts?page=1&pageSize=10");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("contacts");
    expect(response.body).toHaveProperty("totalContacts");
    expect(response.body).toHaveProperty("currentPage");
    expect(response.body).toHaveProperty("totalPages");
  });

  it("should create a new contact", async () => {
    const newContact = {
      name: "João da Silva",
      email: "joaosilva@example.com",
      phone: "40028922",
    };

    const response = await request(app).post("/api/contacts").send(newContact);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");

    createdContactId = response.body._id;
  });

  it("should fetch a single contact by id", async () => {
    const response = await request(app).get(
      `/api/contacts/${createdContactId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", createdContactId);
  });

  it("should update a contact", async () => {
    const updatedContact = {
      name: "João da Silva dos Santos",
      email: "joaosilva2@example.com",
      phone: "1234567890",
    };

    const response = await request(app)
      .put(`/api/contacts/${createdContactId}`)
      .send(updatedContact);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Contact updated" });
  });

  it("should delete a contact", async () => {
    const response = await request(app).delete(
      `/api/contacts/${createdContactId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Contact deleted" });
  });
});
