import dotenv from 'dotenv'

dotenv.config();

export default {
    puerto: process.env.PUERTO,
    mongoUri: process.env.MONGO_URI,
}