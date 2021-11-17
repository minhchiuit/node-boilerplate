import dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  NODE_ENV,
  MONGODB_URL,
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  G_REFRESH_TOKEN,
  ADMIN_EMAIL,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
} = process.env

const config = {
  env: NODE_ENV,
  app_port: PORT,
  mongodb_uri: MONGODB_URL,
  gClientId: G_CLIENT_ID,
  gClientSecret: G_CLIENT_SECRET,
  gRefreshToken: G_REFRESH_TOKEN,
  adminEmail: ADMIN_EMAIL,
  cloud_name: CLOUD_NAME,
  cloud_api_key: CLOUD_API_KEY,
  cloud_api_secret: CLOUD_API_SECRET,
}

export default config
