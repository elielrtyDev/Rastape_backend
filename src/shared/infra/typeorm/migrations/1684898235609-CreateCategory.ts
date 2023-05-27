import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { auditingColumns, idColumn } from '@shared/utils/auditingColumns';
import { auditingForeignKeys } from '@shared/utils/auditingForeignKeys';

export class CreateCategory1684898235609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          ...auditingColumns,
        ],
        foreignKeys: [...auditingForeignKeys],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category');
  }
}
