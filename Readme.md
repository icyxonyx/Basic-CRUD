**Basic CRUD Web** 📝
A full-stack CRUD (Create, Read, Update, Delete) web application built with the **MERN** stack (MongoDB, Express, React, Node.js) that implements:

* User registration
* User login (JWT-based authentication)
* Admin-only view to list and delete users
* Authenticated users can view and update their own profile

The frontend is built with React, Redux Toolkit, and Ant Design (antd), while the backend uses Express, Mongoose, and JSON Web Tokens (JWT).

---

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Environment Variables](#environment-variables)
   * [Running in Development](#running-in-development)
   * [Building for Production](#building-for-production)
4. [Project Structure](#project-structure)
5. [Backend API Endpoints](#backend-api-endpoints)

   * [Authentication & User Routes](#authentication--user-routes)
   * [Admin Routes](#admin-routes)
   * [Profile Route](#profile-route)
6. [Frontend Overview](#frontend-overview)

   * [Routing & Pages](#routing--pages)
   * [Redux Store & Slices](#redux-store--slices)
   * [API Calls](#api-calls)
   * [Styling & Components](#styling--components)
7. [Usage](#usage)
8. [License](#license)

---

## Features ✨

* **User Authentication & Authorization**

  * **Register** a new account (name, email, password).
  * **Login** with email/password to receive a JWT.
  * **Protected routes**: only authenticated users (valid JWT) may access certain pages.

* **Admin Dashboard** 

  * Only users with `isAdmin: true` (manually seeded/assigned) can access the **Admin → Users** view.
  * Admin can **view all registered users** in a paginated table.
  * Admin can **delete any user**.

* **User Profile Management** 

  * Authenticated users can go to **Profile → “This Is You”** to view their name/email.
  * They can click **“Edit”** (UForm) to update their `name`, `email`, and/or `password`.

* **Backend CRUD API** 

  * **Register** (`POST /api/users/register`)
  * **Login** (`POST /api/users/login`)
  * **Get Current User** (`GET /api/users/get-current-user`)
  * **Get All Users** (admin-only, `GET /api/admin/get-all-users`)
  * **Delete User** (admin-only, `POST /api/admin/delete-user`)
  * **Update User** (`POST /api/profile/update-user`, authenticated)

* **Frontend with React, Redux Toolkit, Ant Design** 

  * **React Router v6** for client-side routing.
  * **Redux Toolkit** for global state (user info + loading spinner).
  * **Ant Design (antd)** components for Forms, Cards, Tabs, Tables, Messages, and Layout.
  * **Axios** instance preconfigured to include `Bearer <token>` header.

---

## Technology Stack 🛠️

**Backend**

* Node.js (v14+)
* Express (v4.x)
* MongoDB (using Mongoose v6.x)
* JSON Web Tokens (jsonwebtoken v9.x) for authentication
* bcryptjs (v2.x) for password hashing
* dotenv (v16.x) for environment variables

**Frontend**

* React (v18.x) with Create React App
* Redux Toolkit (v1.x) for state management
* React Router v6 for routing
* Ant Design (v5.x) UI component library
* Axios (v1.x) for HTTP requests
* CSS (with custom .css files under `/stylesheets`)

---

## Getting Started 🚀

### Prerequisites ✅

1. **Node.js** (v14 or higher) installed on your machine.
2. **npm** (v6 or higher), which comes bundled with Node.js.
3. **MongoDB**: Either a local MongoDB instance running or a MongoDB Atlas cluster.

---

### Installation 🔧

1. **Clone the repository**

   ```bash
   git clone https://github.com/icyxonyx/Basic-CRUD.git
   cd Basic-CRUD-Web/Basic\ CRUD\ Web
   ```

2. **Install Backend Dependencies**

   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd client
   npm install
   cd ..
   ```

---

### Environment Variables 🗝️

Create a `.env` file in the **server** directory (i.e., alongside `server.js`). You can use `.env.example` as a reference (if provided). At minimum, define:

```
MONGO_URI=<Your MongoDB connection string>
PORT=5000
jwt_secret=<Your JWT Secret Key>
```

* `MONGO_URI`: MongoDB URI (e.g. `mongodb://localhost:27017/basic-crud-web` or your Atlas URI).
* `PORT`: Port for the Express server (defaults to 5000 if empty).
* `jwt_secret`: Secret string used to sign and verify JWT tokens.

> **Important**: Never commit your real secrets to source control. Add `.env` to `.gitignore`.

---

### Running in Development 🖥️

1. **Start MongoDB** (if using a local instance)

   ```bash
   # For example, on macOS / Linux:
   mongod --dbpath /path/to/your/mongodb/data
   ```

2. **Start the Backend Server**
   From the project root (`Basic CRUD Web/`):

   ```bash
   npm run dev
   ```

   * This runs `nodemon server/server.js` (configured in `nodemon.json`)
   * The API listens on `http://localhost:5000/` by default.

3. **Start the Frontend Client**
   In a new terminal, from project root:

   ```bash
   cd client
   npm start
   ```

   * The React dev server will open `http://localhost:3000/`.
   * By default, Axios is configured to send API requests to `http://localhost:3000/api/...`, and CRA’s `proxy` (in `client/package.json`) should forward `/api` calls to `http://localhost:5000`.

Now you can:

* Register a new user
* Log in
* View your profile
* If you manually set your user’s `isAdmin` flag to `true` in the database, you’ll see the **Admin** tab to list & delete users.

---

### Building for Production 📦

1. **Build the React Frontend**

   ```bash
   cd client
   npm run build
   ```

   * This outputs a production-ready bundle under `client/build/`.

2. **Serve the Static Build with Express**
   Back in the project root:

   ```bash
   cd ..
   NODE_ENV=production npm start
   ```

   * In production mode, the Express server (in `server/server.js`) is configured to serve `client/build` as static files.
   * All unmatched routes will return `index.html` from the build, so React Router still works.

Your entire app (API + frontend) will now be available on `http://localhost:5000/`.

---

## Project Structure 📂

```
Basic CRUD Web/
├── .gitignore
├── nodemon.json           # nodemon config: watches server files
├── package.json           # Backend scripts & dependencies
├── server/                # <— Backend
│   ├── server.js          # Express server entrypoint
│   ├── config/
│   │   └── dbConfig.js    # MongoDB connection setup (uses MONGO_URI)
│   ├── middlewares/
│   │   └── authMiddleware.js  # Verifies JWT, sets req.body.userId
│   ├── models/
│   │   └── userModel.js   # Mongoose schema/model for User
│   └── routes/
│       ├── usersRoute.js    # /api/users (register, login, get-current-user)
│       ├── adminRoute.js    # /api/admin   (get-all-users, delete-user)
│       └── profileRoute.js  # /api/profile (update-user)
│
└── client/                # <— Frontend (React)
    ├── package.json       # Frontend scripts & dependencies
    ├── public/
    │   ├── index.html
    │   └── (favicon, manifest, logos…)
    │
    └── src/
        ├── apicalls/      # Functions wrapping Axios for each endpoint
        │   ├── admin.js       # GetAllUsers, DeleteUser
        │   ├── profile.js     # UpdateUser
        │   └── users.js       # RegisterUser, LoginUser, GetCurrentUser
        │   └── index.js       # Exports `axiosInstance` configured with JWT
        │
        ├── components/
        │   ├── ProtectedRoute.js  # HOC that checks JWT, fetches current user
        │   ├── Button.jsx         # Reusable button component
        │   ├── PageTitle.jsx      # Renders page header
        │   └── Background.jsx     # Site background (common wrapper)
        │
        ├── pages/
        │   ├── Home/
        │   │   └── index.js      # Home page (simple placeholder)
        │   ├── Login/
        │   │   └── index.js      # Login form (Ant Design Form)
        │   ├── Register/
        │   │   └── index.js      # Registration form
        │   ├── Profile/
        │   │   ├── index.js      # Profile tabs
        │   │   ├── UserDetails.js  # Displays current user’s name/email
        │   │   └── UForm.js       # Form to update user fields (name/email/password)
        │   └── Admin/
        │       ├── index.js      # Admin page with Tabs
        │       └── UsersList.js  # Ant Design Table listing all users (delete button)
        │
        ├── redux/
        │   ├── store.js         # Configures Redux store (combines slices)
        │   ├── usersSlice.js    # Holds current user info (SetUser)
        │   └── loadersSlice.js  # Holds loading state (ShowLoading, HideLoading)
        │
        ├── stylesheets/         # Custom CSS files
        │   ├── alignments.css
        │   ├── custom.css
        │   ├── form-elements.css
        │   ├── sizes.css
        │   └── theme.css
        │
        ├── App.js               # Sets up React Router, routes for pages
        ├── index.js             # Renders <App /> inside Redux Provider
        └── index.css            # Global CSS resets or global styles
```

---

## Backend API Endpoints 🔗

All backend routes are prefixed with `/api`. Requests and responses are in JSON. Endpoints in **bold** require a valid JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

### Authentication & User Routes

1. **POST /api/users/register**
   Register a new user.

   * **Body** (JSON):

     ```json
     {
       "name": "John Smith",
       "email": "john@example.com",
       "password": "MySecurePass123"
     }
     ```
   * **Response (200 OK)**:

     ```json
     {
       "success": true,
       "message": "User created successfully"
     }
     ```
   * **Errors**:

     * `{"success": false, "message": "User already exists"}` if email is taken.
     * Validation errors if fields are missing.

2. **POST /api/users/login**
   Authenticate an existing user.

   * **Body** (JSON):

     ```json
     {
       "email": "john@example.com",
       "password": "MySecurePass123"
     }
     ```
   * **Response (200 OK)**:

     ```json
     {
       "success": true,
       "message": "User logged in successfully",
       "data": {
         "user": {
           "_id": "64a1ebf3a...",
           "name": "John Smith",
           "email": "john@example.com",
           "isAdmin": false,
           "createdAt": "2023-07-01T12:34:56.789Z",
           "updatedAt": "2023-07-01T12:34:56.789Z"
         }
       },
       "token": "<JWT_Token_String>"
     }
     ```
   * **Errors**:

     * `{"success": false, "message": "Credentials do not match"}`
     * `{"success": false, "message": "User does not exist"}`
     * `401 Unauthorized` for missing/wrong password.

3. **GET /api/users/get-current-user** 🔒
   Get currently authenticated user’s data.

   * **Headers**: `Authorization: Bearer <token>`
   * **Response (200 OK)**:

     ```json
     {
       "success": true,
       "message": "User details fetched successfully",
       "data": {
         "_id": "64a1ebf3a...",
         "name": "John Smith",
         "email": "john@example.com",
         "isAdmin": false,
         "createdAt": "2023-07-01T12:34:56.789Z",
         "updatedAt": "2023-07-01T12:34:56.789Z"
       }
     }
     ```
   * **Errors**:

     * `401 Unauthorized` if token is missing/invalid.

---

### Admin Routes

1. **GET /api/admin/get-all-users** 🔒
   Retrieve a list of all registered users (sorted newest first).

   * **Headers**: `Authorization: Bearer <token>`
   * **Response (200 OK)**:

     ```json
     {
       "success": true,
       "message": "Users fetched successfully",
       "data": [
         {
           "_id": "64a1ebf3a...",
           "name": "Alice Example",
           "email": "alice@example.com",
           "isAdmin": true,
           "createdAt": "2023-07-02T09:10:11.123Z",
           "updatedAt": "2023-07-02T09:10:11.123Z"
         },
         {
           "_id": "64a1ddc0b...",
           "name": "Bob Example",
           "email": "bob@example.com",
           "isAdmin": false,
           "createdAt": "2023-07-01T15:20:30.456Z",
           "updatedAt": "2023-07-01T15:20:30.456Z"
         },
         // …more users
       ]
     }
     ```
   * **Errors**:

     * `401 Unauthorized` if token is invalid.

2. **POST /api/admin/delete-user** 🔒
   Delete a user by their ID.

   * **Headers**: `Authorization: Bearer <token>`
   * **Body** (JSON):

     ```json
     {
       "userId": "64a1ddc0b..."
     }
     ```
   * **Response (200 OK)**:

     ```json
     {
       "success": true,
       "message": "User deleted successfully"
     }
     ```
   * **Errors**:

     * `401 Unauthorized` if token is invalid.

> **Note**: In this implementation, *any* valid token can call `/api/admin/*`—the code does not explicitly check `isAdmin`. To enforce real admin-only access, you must check `req.body.userId` or a user’s `isAdmin` field in the route handler before proceeding.

---

### Profile Route

1. **POST /api/profile/update-user** 🔒
   Update the current user’s profile fields.

   * **Headers**: `Authorization: Bearer <token>`
   * **Body** (JSON):

     ```json
     {
       "userId": "64a1ebf3a...",       // set by authMiddleware from token
       "name": "John Updated",         // optional
       "email": "newemail@example.com",// optional
       "password": "NewPass123"        // optional; if provided, will be hashed
     }
     ```
   * **Response (200 OK)**:

     ```json
     {
       "success": true,
       "message": "User updated successfully"
     }
     ```
   * **Errors**:

     * `401 Unauthorized` if token is invalid.
     * Validation errors if email is duplicate, etc.

---

## Frontend Overview 🌐

The frontend is a **React** application structured under `client/src/`. It uses:

* **React Router v6** for client-side routing.
* **Redux Toolkit** (with two slices: `usersSlice` and `loadersSlice`) for global state.
* **Ant Design (antd)** for UI components (Form, Button, Card, Tabs, Table, message notifications).
* **Axios** (wrapped in `axiosInstance`) to automatically send `Content-Type: application/json` and `Authorization: Bearer <token>` with each request (using token from `localStorage`).
* Custom CSS files under `src/stylesheets/` for additional theming.

---

### Routing & Pages

Under `client/src/App.js`, routes are defined as follows:

```jsx
<BrowserRouter>
  <Background>
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Protected Routes: Requires a valid JWT */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile/edit" 
        element={
          <ProtectedRoute>
            <UForm />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Background>
</BrowserRouter>
```

1. **Home** ( `/` )

   * Simple placeholder page with a heading “Home Page”.

2. **Login** ( `/login` )

   * Ant Design `<Form>` with fields: **Email** + **Password**.
   * On submit, calls `LoginUser(values)`. On success, saves JWT to `localStorage` and dispatches `SetUser` with the returned user data. Then redirects to `/profile`.

3. **Register** ( `/register` )

   * Ant Design `<Form>` with fields: **Name**, **Email**, **Password**, **Confirm Password**.
   * On submit, calls `RegisterUser(values)`. On success, shows a success message and redirects to `/login`.

4. **Profile** ( `/profile` )

   * Protected: runs `GetCurrentUser()` on mount to fetch user data.
   * Renders an Ant Design `<Tabs>` with one tab “This Is You” → shows user’s **Name** + **Email** inside an Ant Design `<Card>`.
   * A small **Edit** icon in the card’s extra section links to `/profile/edit`.

5. **Edit Profile (UForm)** ( `/profile/edit` )

   * Protected: preloads current user’s data from Redux store.
   * Ant Design `<Form>` with fields: **Name**, **Email**, **Password** (optional to change).
   * On submit, calls `UpdateUser({ userId, name, email, password })`. On success, re-fetches current user and shows a success message.

6. **Admin** ( `/admin` )

   * Protected: runs `GetAllUsers()` on mount.
   * Displays Ant Design `<Table>` listing all users (columns: Name, Email, Created At, Actions).
   * Each row has a “Delete” action button that calls `DeleteUser({ userId })`. On success, re-fetches user list and shows a success message.

---

### Redux Store & Slices

Under `client/src/redux/`:

1. **store.js**

   * Combines two slices (`usersSlice` + `loadersSlice`) into a single Redux store with Redux Toolkit’s `configureStore`.
   * Exports the store.

2. **usersSlice.js**

   ```js
   import { createSlice } from "@reduxjs/toolkit";

   const usersSlice = createSlice({
     name: "users",
     initialState: {
       user: null, // Holds the current logged-in user’s data
     },
     reducers: {
       SetUser: (state, action) => {
         state.user = action.payload;
       },
     },
   });

   export const { SetUser } = usersSlice.actions;
   export default usersSlice.reducer;
   ```

3. **loadersSlice.js**

   ```js
   import { createSlice } from "@reduxjs/toolkit";

   const loadersSlice = createSlice({
     name: "loaders",
     initialState: {
       loading: false,
     },
     reducers: {
       ShowLoading: (state) => { state.loading = true; },
       HideLoading: (state) => { state.loading = false; },
     },
   });

   export const { ShowLoading, HideLoading } = loadersSlice.actions;
   export default loadersSlice.reducer;
   ```

* **Usage in Components**: Before any API call (e.g., login/register), components dispatch `ShowLoading()`. After the call, they dispatch `HideLoading()`.
* When `loading === true`, you can show a global spinner (not included by default, but you can easily render one at the top level).

---

### API Calls

Under `client/src/apicalls/`:

1. **index.js**

   ```js
   import axios from "axios";

   export const axiosInstance = axios.create({
     headers: {
       "Content-Type": "application/json",
       authorization: `Bearer ${localStorage.getItem("token")}`,
     },
   });
   ```

   * Every request via `axiosInstance` automatically includes the `Authorization` header if `localStorage.getItem("token")` exists.

2. **users.js**

   * `RegisterUser(payload)` → `POST /api/users/register`
   * `LoginUser(payload)` → `POST /api/users/login`
   * `GetCurrentUser()` → `GET /api/users/get-current-user`

3. **admin.js**

   * `GetAllUsers()` → `GET /api/admin/get-all-users`
   * `DeleteUser(payload)` → `POST /api/admin/delete-user`

4. **profile.js**

   * `UpdateUser(payload)` → `POST /api/profile/update-user`

---

### Styling & Components

* **Ant Design (antd)** components are used throughout:

  * `<Form>`, `<Input>`, `<Button>` (wrapped in `components/Button.jsx`), `<Card>`, `<Avatar>`, `<Tabs>`, `<Table>`, and `message.*` notifications.

* **Custom CSS** under `client/src/stylesheets/`:

  * `alignments.css`
  * `custom.css`
  * `form-elements.css`
  * `sizes.css`
  * `theme.css`

* **Background.jsx**

  * Wraps the entire app in a `<div className="background">…</div>`. You can customize the background image or colors here.

---

## Usage 🏃‍♂️

1. **Register** a new user at `http://localhost:3000/register`.
2. **Login** using the registered email/password at `http://localhost:3000/login`.

   * On successful login, the JWT token is stored in `localStorage` under the key `token`. Redux’s `dispatch(SetUser(userData))` stores the current user in state.
3. **Profile**:

   * Visit `http://localhost:3000/profile` to see your name & email.
   * Click the Edit (✏️) icon to navigate to `http://localhost:3000/profile/edit` and update your name, email, or password.
4. **Admin (Optional)**:

   * If you manually set your user’s `isAdmin: true` in MongoDB, you will see an **Admin** tab in the navbar.
   * Click **Admin → Users** to view all registered users. You can click **Delete** to remove any user.

> **Tip**: To mark yourself as an admin, open a MongoDB shell or Compass and run:
>
> ```js
> db.users.updateOne(
>   { email: "your-email@example.com" },
>   { $set: { isAdmin: true } }
> );
> ```

---

## License 📄

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it in your own applications.
