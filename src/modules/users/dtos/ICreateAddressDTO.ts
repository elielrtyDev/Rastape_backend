interface ICreateAddressDTO {
  street: string;
  neighborhood: string;
  cep: string;
  number: number;
  city: string;
  state_id: string;
  complement?: string;
  reference?: string;
}

export default ICreateAddressDTO;
