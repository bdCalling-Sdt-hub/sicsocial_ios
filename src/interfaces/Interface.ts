export interface IVerifyUserRoute {
  email: string;
  otp?: number;
  verificationType: 'emailVerification' | 'passwordReset';
}
