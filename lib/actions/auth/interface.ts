export interface ISendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export interface ISendAuthMailRes {
  success: boolean;
  status: number;
  message: string;
}

export interface IOtp {
  email: string;
  otp: number;
  expiresAt: Date;
  lastSentAt: Date;
}

export interface IVerifyAuthRes {
  success: boolean;
  status: number;
  message: string;
  role?: string;
}