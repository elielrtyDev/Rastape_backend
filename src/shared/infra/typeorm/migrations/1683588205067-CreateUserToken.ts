import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { auditingColumns, idColumn } from '@shared/utils/auditingColumns';
import { auditingForeignKeys } from '@shared/utils/auditingForeignKeys';

export default class CreateUserToken1683588205067
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_token',
        columns: [
          idColumn,
          {
            name: 'refresh_token',
            type: 'varchar',
          },
          {
            name: 'expires_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'fcm_token',
            type: 'boolean',
            default: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          ...auditingColumns,
        ],
        foreignKeys: [
          {
            name: 'FKUserToken',
            columnNames: ['user_id'],
            referencedTableName: 'user',
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
    await queryRunner.dropTable('user-token');
  }
}
