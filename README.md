# Task Manager

This project is a full implementation of authentication using:
- Nest.js for the backend;
- Next.js for the frontend;
- GraphQL.

Features
- Pomodoro Timer: Manage your work intervals with a built-in Pomodoro timer to boost productivity;
- Time Blocking: Plan your day by blocking time for tasks and activities;
- Task Management: Organize tasks in both list and Kanban views for better visualization and control.


## Getting Started
To get started with the project, follow these steps:

### 1. Cloning the Repository

```
git clone https://github.com/CodiProgs/task-manager-backend.git
```
```
cd task-manager-backend
```
### 2. Setting up

Create a .env file based on .env.example:

```
cp .env.example .env
```

Database Setup:
If you have Docker installed, you can set up the database using Docker Compose:

```
docker-compose up -d
```

Install dependencies:

```
yarn install
```

Apply database migrations using Prisma:
```
prisma db push
```

Start the server in development mode:
```
yarn start:dev
```
