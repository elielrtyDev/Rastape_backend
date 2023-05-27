export default interface IFiltersDTO {
  [key: string]: string | number | boolean | undefined;
  sort?: string;
  page?: string | number;
  limit?: string | number;
}
