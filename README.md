# Career Day

Connecting teachers with industry professionals or whatever idk TODO: write something here.

## Contributing

### Development Setup

Ensure you have docker installed and clone this repo.

Run the development server:
```
docker-compose up
```

There might be errors.  In a separate tab, run the following to run database migrations:
```
docker-compose exec app npm run typeorm migration:run
```

Then run `docker-compose-up` again (killing the original)

Access GraphiQL at http://localhost:3000/graphql

### Command Reference

Run tests:
```
docker-compose exec app npm run test
```

Lint your files:
```
npm run lint
```

Find more scripts in `package.json`.

Connect to the database
```
docker-compose exec db psql -U postgres -d careerday
```
(replace `careerday` with `test` if trying to access the test DB)

Do _anything_ with TypeORM (example below):
```
docker-compose exec app npm run typeorm <command> -- <command line args>
```

Create a migration
```
docker-compose exec app npm run typeorm migration:generate -- -n <migration name>
```

Run migrations
```
docker-compose exec app npm run migrations:run
```