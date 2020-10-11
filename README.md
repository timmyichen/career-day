# Career Day

Connecting teachers with industry professionals or whatever idk TODO: write something here.

## Contributing

### Development Setup

Ensure you have docker installed and clone this repo.

Run the development server:
```
docker-compose up
```

Then, while the docker instance is still running:

Run tests:
```
docker-compose exec app npm run test
```

Lint your files:
```
npm run lint
```

Find more scripts in `package.json`.

Access GraphiQL at http://localhost:3000/graphql

### Command Reference

Connect to the database
```
docker-compose exec db psql -U postgres -d postgres
```
