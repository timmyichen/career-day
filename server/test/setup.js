// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

if (process.env.NODE_ENV === 'test') {
  try {
    execSync('dropdb -h db -U postgres test');
    console.log('Destroyed existing test database');
  } catch (e) {
    console.log('Could not delete existing test db, probably doesnt exist');
  }

  execSync('createdb -h db -U postgres test');
  console.log('Created test database');

  console.log('Running migrations...');
  execSync('npm run migrations:run', { stdio: 'inherit' });
  console.log('Migrations completed');
} else {
  throw new Error(`node env was '${process.env.NODE_ENV}', expected 'test'`);
}
