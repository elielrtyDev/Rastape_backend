import State from '../infra/typeorm/entities/State';

interface IStatesRepository {
  findAll(): Promise<State[]>;
  findById(id: string): Promise<State | undefined>;
  findByAcronym(acronym: string): Promise<State | undefined>;
}

export default IStatesRepository;
