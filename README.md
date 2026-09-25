# Task Management API

A REST API for managing tasks. This project is built using NestJS, PostgreSQL, TypeORM and JWT authentication.

## Tech Stack

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Passport
- bcrypt
- class-validator
- Swagger
- Docker

## Features

- User registration
- User login
- JWT authentication
- Password hashing using bcrypt
- Create, read, update and delete tasks
- Users can only access their own tasks
- Task pagination
- Task completion status
- Soft delete for tasks
- Request validation
- Global error handling
- Swagger API documentation

## Requirements

- Node.js
- pnpm
- Docker
- Docker Compose

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd task-management-api
```

Install dependencies:

```bash
pnpm install
```

## Environment Variables

Create a `.env` file in the root directory and take references from .env.example for env variables.

## Database Setup

Start PostgreSQL using Docker:

```bash
docker compose up -d
```

Run the database migrations:

```bash
pnpm run migration:run
```

To generate a new migration:

```bash
pnpm run migration:generate src/database/migrations/MigrationName
```

To revert the last migration:

```bash
pnpm run migration:revert
```

## Running the Project

For development:

```bash
pnpm run start:dev
```

To build the project:

```bash
pnpm run build
```

The API will be available at:

```text
http://localhost:3000
```

## Swagger

Swagger documentation is available at:

```text
http://localhost:3000/api/docs
```

You can use Swagger to register a user, login and test the protected task endpoints.

## API Endpoints

### Authentication

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/auth/register` | Register a new user   |
| POST   | `/auth/login`    | Login and receive JWT |

### Tasks

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| POST   | `/tasks`     | Create a task    |
| GET    | `/tasks`     | Get user's tasks |
| GET    | `/tasks/:id` | Get a task       |
| PATCH  | `/tasks/:id` | Update a task    |
| DELETE | `/tasks/:id` | Delete a task    |

All task endpoints require a valid JWT access token.

## Pagination

The task list supports pagination using `page` and `limit`.

Example:

```text
GET /tasks?page=1&limit=10
```

If no values are provided, the API uses:

- Page: 1
- Limit: 10

The maximum limit is 100.

## Task Update

A task can be updated using:

```json
{
  "title": "Complete assessment",
  "description": "Finish the backend assessment",
  "isCompleted": true
}
```

All update fields are optional.

## Task Deletion

Tasks use soft deletion.

When a task is deleted, it is not physically removed from the database. TypeORM stores the deletion time in the `deleted_at` column, and deleted tasks are excluded from normal task queries.

## Validation

The API validates incoming requests using `class-validator`.

Some examples:

- Email must be valid.
- Password must contain at least 6 characters.
- Task title is required when creating a task.
- Page and limit must contain valid numbers.
- `isCompleted` must be a boolean.
- Unknown request fields are rejected.

## Authentication and Authorization

Passwords are hashed using bcrypt before being stored.

After login, the API returns a JWT access token. The token must be sent with protected requests using:

```text
Authorization: Bearer <access-token>
```

Users can only access and modify their own tasks.

## Error Responses

The API returns consistent error responses.

Example:

```json
{
  "statusCode": 404,
  "message": "Task not found",
  "path": "/tasks/10",
  "timestamp": "2026-09-25T00:00:00.000Z"
}
```

Common status codes:

- `400` - Invalid request or validation error
- `401` - Authentication required or invalid token
- `403` - User does not have access
- `404` - Resource not found
- `409` - Email already registered
- `500` - Internal server error

## Project Structure

```text
src/
├── common/
├── configs/
├── database/
├── modules/
│   ├── auth/
│   ├── users/
│   └── tasks/
├── app/
└── main.ts
```

```bash
pnpm run build
```
