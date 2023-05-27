interface ICreateUserTokenDTO {
  user_id: string;
  refresh_token: string;
  expires_date?: Date;
  fcm_token?: boolean;
}

export default ICreateUserTokenDTO;
