export default interface IPaginatedResponseDTO<T> {
  result: Array<T>;
  page: string | number;
  limit: string | number;
  totalItems: number;
  totalPages: number;
}
