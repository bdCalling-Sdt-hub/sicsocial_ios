export interface IVerifyUserRoute {
  email: string;
  otp?: 143119;
  verificationType: 'emailVerification' | 'passwordReset';
}
