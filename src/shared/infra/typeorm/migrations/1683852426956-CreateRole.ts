import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { auditingColumns, idColumn } from '@shared/utils/auditingColumns';
import { auditingForeignKeys } from '@shared/utils/auditingForeignKeys';

export default class CreateRole1683852426956 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          ...auditingColumns,
        ],
        foreignKeys: [...auditingForeignKeys],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role');
  }
}
