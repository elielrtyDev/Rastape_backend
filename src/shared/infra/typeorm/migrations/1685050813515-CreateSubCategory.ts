import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { auditingColumns, idColumn } from '@shared/utils/auditingColumns';
import { auditingForeignKeys } from '@shared/utils/auditingForeignKeys';

export class CreateSubCategory1685050813515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subcategory',
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
          ...auditingColumns,
        ],
        foreignKeys: [
          {
            name: 'FKSubcategoryCategory',
            columnNames: ['category_id'],
            referencedTableName: 'category',
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
    await queryRunner.dropTable('sub_category');
  }
}
