interface ICreateUserDTO {
  name: string;
  email: string;
  phone?: string;
  password: string;
  avatar?: string;
}

export default ICreateUserDTO;
