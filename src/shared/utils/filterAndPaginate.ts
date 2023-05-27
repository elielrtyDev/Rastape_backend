import { SelectQueryBuilder } from 'typeorm';
import validator from 'validator';

import IFiltersDTO from '@shared/dtos/IFiltersDTO';
import IPaginatedResponseDTO from '@shared/dtos/IPaginatedResponseDTO';

export default async function filterAndPaginate<T>(
  query: SelectQueryBuilder<T>,
  { sort, page = 1, limit = 20, ...filters }: IFiltersDTO,
): Promise<IPaginatedResponseDTO<T>> {
  Object.entries(filters).forEach(filter => {
    const key = String(filter[0]);
    const value = String(filter[1]);

    if (!value) {
      return;
    }

    if (
      ['created_at', 'updated_at', 'deleted_at'].includes(key) &&
      !validator.isDate(value)
    ) {
      return;
    }

    if (
      validator.isBoolean(value, { loose: true }) ||
      validator.isNumeric(value)
    ) {
      query.andWhere(`${key} = :${key}`, {
        [key]: value,
      });

      return;
    }

    if (validator.isDate(value)) {
      query.andWhere(`TO_CHAR(entity.${key}, 'YYYY-MM-DD') = :${key}`, {
        [key]: value,
      });

      return;
    }

    query.andWhere(
      `${
        key.includes('.') ? key : `entity.${key}`
      } ILIKE '%' || :${key} || '%'`,
      {
        [key]: String(value),
      },
    );
  });

  if (sort) {
    sort.split(',').forEach(item => {
      const orderBy = item.slice(1);
      const order = item[0] === '+' ? 'ASC' : 'DESC';

      query.addOrderBy(orderBy, order);
    });
  }

  const [result, totalItems] = await query
    .offset((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .getManyAndCount();

  const response = {
    result,
    page,
    limit,
    totalItems,
    totalPages: Math.ceil(totalItems / Number(limit)),
  };

  return response;
}
