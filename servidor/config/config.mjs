import dotenv from 'dotenv'

dotenv.config();

export default {
    puerto: process.env.PUERTO,
    mongoUri: process.env.MONGO_URI,
    JWToken: process.env.FIRMA_JWT,
    cookieSignature: process.env.FIRMA_COOKIE
}