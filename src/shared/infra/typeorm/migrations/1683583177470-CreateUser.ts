import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { auditingColumns, idColumn } from '@shared/utils/auditingColumns';
import { auditingForeignKeys } from '@shared/utils/auditingForeignKeys';

export default class CreateUser1683583177470 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          ...auditingColumns,
        ],
        foreignKeys: [...auditingForeignKeys],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
