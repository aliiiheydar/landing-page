const config = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL || "",
  jwtSecret: process.env.JWT_SECRET || '',
  passwordEncryptionKey: process.env.PASSWORD_ENCRYPTION_KEY || "",
  smsNumber: process.env.SMS_NUMBER || "",
  smsUsername: process.env.SMS_USERNAME || "",
  smsPassword: process.env.SMS_PASSWORD || "",
  backendUrl: process.env.BACKEND_URL || ""
}

export default config