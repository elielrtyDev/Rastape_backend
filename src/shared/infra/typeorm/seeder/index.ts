import createRoles from './roles';
import createUsers from './users';

async function run(): Promise<void> {
  try {
    await createRoles();

    await createUsers();
  } catch (error) {
    console.log(error);
  }
}

run();
