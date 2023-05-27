import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import createConnection from '..';

async function create(): Promise<void> {
  const connection = await createConnection();

  const user_id = uuid();
  const password = await hash('admin', 8);

  try {
    await connection.query(
      `INSERT INTO "user"(id, name, email, phone, password)
        VALUES('${user_id}', 'admin', 'admin@rastape.com',  '99999999999', '${password}')`,
    );

    await connection.query(
      `INSERT INTO "user_role"(user_id, role_id, created_by)
        VALUES('${user_id}', '2b0a7481-ce74-479c-8623-9474c2b95f77',  '${user_id}')`,
    );

    await connection.query(
      `INSERT INTO "user_role"(user_id, role_id, created_by)
        VALUES('${user_id}', '4a7026c1-27da-4332-ba61-bce0a429407a',  '${user_id}')`,
    );
  } catch (err) {
    console.log(err);
  }

  await connection.close();
}

export default create;
