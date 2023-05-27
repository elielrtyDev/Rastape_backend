import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { auditingColumns, idColumn } from '@shared/utils/auditingColumns';
import { auditingForeignKeys } from '@shared/utils/auditingForeignKeys';

export default class CreateUsersRoles1683863658631
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_role',
        columns: [
          idColumn,
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'role_id',
            type: 'uuid',
          },
          ...auditingColumns,
        ],
        foreignKeys: [
          {
            name: 'FKUserRole',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: 'FKRoleUser',
            columnNames: ['role_id'],
            referencedTableName: 'role',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          ...auditingForeignKeys,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user-role');
  }
}
