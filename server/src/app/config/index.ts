import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    payment_url: process.env.PAYMENT_URL,
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,

    google_api_key: process.env.GOOGLE_API_KEY,
    gemini_api_key: process.env.GEMINI_API_KEY,
    astra_db_namespace: process.env.ASTRA_DB_NAMASPACE,
    astra_db_collection: process.env.ASTRA_DB_COLLECTION,
    astra_db_api_endpoint: process.env.ASTRA_DB_API_ENDPOINT,
    astra_db_application_token: process.env.ASTRA_DB_APPLICATION_TOKEN,
};
