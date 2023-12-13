# Project README

## Installing Dependencies

To install the project dependencies, run the following command:

```bash
npm install
```

## Environment Variables

Before running the project, ensure that the following environment variables are set in a `.env` file:

```plaintext
DATABASE_NAME=test2
DATABASE_USER=postgres
DATABASE_PASSWORD=new_password
DATABASE_HOST=localhost
DATABASE_DIALECT=postgres
DATABASE_PORT=5432
```

## DB Migrate

### Running Migrate Command

To initialize the database and create the necessary tables, use the following command:

```bash
npm run migrate
```

## Seed Data

### Running Seed Command

To seed the database with initial data, use the following command:

```bash
npm run seed
```

## Project Run

### Running Start Command

To start the project, use the following command:

```bash
npm run dev
```
