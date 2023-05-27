import { TableColumnOptions } from 'typeorm';

export const idColumn: TableColumnOptions = {
  name: 'id',
  type: 'uuid',
  isPrimary: true,
  generationStrategy: 'uuid',
  default: 'uuid_generate_v4()',
};

export const auditingColumns: TableColumnOptions[] = [
  {
    name: 'created_by',
    type: 'uuid',
    isNullable: true,
  },
  {
    name: 'updated_by',
    type: 'uuid',
    isNullable: true,
  },
  {
    name: 'deleted_by',
    type: 'uuid',
    isNullable: true,
  },
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    isNullable: true,
  },
  {
    name: 'deleted_at',
    type: 'timestamp',
    isNullable: true,
  },
];
