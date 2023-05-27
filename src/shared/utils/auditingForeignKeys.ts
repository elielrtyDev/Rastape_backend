import { TableForeignKeyOptions } from 'typeorm';

export const auditingForeignKeys: TableForeignKeyOptions[] = [
  {
    name: 'FKCreatedBy',
    columnNames: ['created_by'],
    referencedTableName: 'user',
    referencedColumnNames: ['id'],
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  {
    name: 'FKUpdatedBy',
    columnNames: ['updated_by'],
    referencedTableName: 'user',
    referencedColumnNames: ['id'],
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  {
    name: 'FKDeletedBy',
    columnNames: ['deleted_by'],
    referencedTableName: 'user',
    referencedColumnNames: ['id'],
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
];
