# User Management API

## About

This is a simple User Management REST API built using Node.js and Express. It allows to create, update, delete and fetch users.
I have also added search and sorting functionality so users can be filtered easily based on name, username or email.
Basic validation and error handling is implemented to make sure API works properly with correct data.

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- SQLite

## Main Functionality

- Create new user
- Get all users
- Get user by id
- Update user details
- Delete user

- Search users by name, username and email
- Sort users by fields like name, email, username and createdAt

- Input validation for required fields
- Proper error handling with status codes

## API Endpoints

### POST /users
Create a new user

### GET /users
Get all users  
Supports query params:
- `search` → search by name, username or email  
- `sort` → field to sort (name, email, username, createdAt)  
- `order` → asc or desc  

### GET /users/:id
Get user details by id

### PUT /users/:id
Update existing user

### DELETE /users/:id
Delete user

## Setup Instructions

1. Clone the repository

```
git clone https://github.com/suraj-tetarwal/BuyerForesight-Backend-Assignment.git
cd BuyerForesight-Backend-Assignment
```

2. Install dependencies

```
npm install
```

3. Run the server

```
npm start
```

Server will start on: http://localhost:3000/

**NOTE**: No separate database setup is required. SQLite database will be created automatically when the server starts.

## Assumptions

- Used `sequelize.sync()` for simplicity. In real production apps, migrations should be used instead of sync.

- SQLite is used as database for this assignment. Since it is file based, data may reset on redeploy in some cloud platforms.

- Only basic features are implemented as per assignment requirements. Pagination is not added.

- Email and username are checked for uniqueness before creating or updating user.

## Deployment

Deployed API Link:
