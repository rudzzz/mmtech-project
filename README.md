# Contacts Management System

This project is a Contacts Management System built with Node.js for the backend and React for the frontend, designed to manage contacts' information such as name, email, and phone number. The system supports CRUD operations (Create, Read, Update, Delete) and includes pagination for viewing contacts.

## Technologies Used:
- **Backend**: Node.js, Express.js, NeDB (embedded database)
- **Frontend**: React, React Router, Axios
- **Testing**: Jest, Supertest
- **Styling**: Basic CSS

## Features:
1. **Backend API (Node.js + Express)**:
   - **Endpoints**:
     - `GET /api/contacts`: Fetch all contacts with pagination.
     - `GET /api/contacts/:id`: Fetch a single contact by ID.
     - `POST /api/contacts`: Create a new contact.
     - `PUT /api/contacts/:id`: Update an existing contact.
     - `DELETE /api/contacts/:id`: Delete a contact.
   - **Data Storage**: Uses NeDB, an embedded JavaScript database, to store contact information.

2. **Frontend (React)**:
   - **Components**:
     - **ContactsList**: Displays paginated contacts with options to edit, view details, and delete contacts.
     - **ContactsForm**: Allows users to add new contacts or edit existing ones.
     - **ContactsDetail**: Shows detailed information of a single contact.
     - **Pagination**: Enables navigation through pages of contacts.
   - **Routing**: Utilizes React Router for navigation between different views (list, form, details).

3. **Validation and Error Handling**:
   - **Backend**: Validates required fields (name, email, phone) before processing CRUD operations.
   - **Frontend**: Basic form validation to ensure required fields are filled before submission.

4. **Testing**:
   - **Backend**: Unit testing with Jest and Supertest for API endpoints (CRUD operations).

## Setup Instructions:
1. Clone the repository:

2. Install dependencies:
- Backend:
  ```
  cd backend
  npm install
  ```
- Frontend:
  ```
  cd frontend
  npm install
  ```

3. Run the application:
- Backend:
  ```
  npm start
  ```
  The server will run at `http://localhost:3000`.

- Frontend:
  ```
  npm run dev
  ```
  The React application will run at `http://localhost:5173/`.

4. Access the application in your browser:
- Open `http://localhost:5173` to view the Contacts Management System frontend.

Copyright :copyright: 2024 - Contacts Management System

