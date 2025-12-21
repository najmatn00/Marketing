// API types for authentication endpoints

/** ---- AUTHENTICATION ----- */
export interface SendOtpDto {
  phone: string;
  deviceId?: string;
}

export interface VerifyOtpDto {
  phone: string;
  otp: string;
  deviceId: string;
  referralCode?: string;
}

