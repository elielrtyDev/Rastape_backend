import IUpdateAddressDTO from './IUpdateAddressDTO';

interface IUpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  birth_date?: Date;
  password?: string;
  cpf?: string;
  phone?: string;
  gender?: string;
  avatar?: string;
  address_id?: string;
  address: IUpdateAddressDTO;
}

export default IUpdateUserDTO;
