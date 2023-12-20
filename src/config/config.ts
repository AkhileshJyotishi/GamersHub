import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    FRONTEND_BASE_URL: Joi.string().description('Frontend application base url'),
    BACKBLAZE_ACCESS_KEY_ID: Joi.string().description('Backblaze access key id'),
    BACKBLAZE_SECRET_ACCESS_KEY: Joi.string().description('Backblaze secret access key id'),
    BACKBLAZE_REGION: Joi.string().description('Backblaze region'),
    BACKBLAZE_BUCKET_NAME: Joi.string().description('Backblaze bucket name'),
    BACKBLAZE_ENDPOINT_URL: Joi.string().description('Backblaze endpoint url')
  })
  .unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: {
      name : envVars.EMAIL_FROM as string,
      address : envVars.SMTP_USERNAME
    }
  },
  frontend: {
    url: envVars.FRONTEND_BASE_URL
  },
  backblaze: {
    accessKey: envVars.BACKBLAZE_ACCESS_KEY_ID,
    secretAccess: envVars.BACKBLAZE_SECRET_ACCESS_KEY,
    region: envVars.BACKBLAZE_REGION,
    bucket: envVars.BACKBLAZE_BUCKET_NAME,
    url: envVars.BACKBLAZE_ENDPOINT_URL
  }
}
