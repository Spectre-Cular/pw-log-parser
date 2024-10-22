// /utils/dbConnect.ts
import mongoose from 'mongoose';

const MONGODB_USER = process.env.MONGODB_USER as string;
const MONGODB_PASS = process.env.MONGODB_PASS as string;
const MONGODB_HOST = process.env.MONGODB_HOST as string;
const MONGODB_AUTHSOURCE = process.env.MONGODB_AUTHSOURCE as string;
const MONGODB_APPNAME = process.env.MONGODB_APPNAME as string;
const MONGODB_DBNAME = process.env.MONGODB_DBNAME as string;

if (!MONGODB_USER || !MONGODB_PASS || !MONGODB_HOST || !MONGODB_AUTHSOURCE || !MONGODB_APPNAME) {
    throw new Error(
        'Please double check your MONGODB_* environment variables'
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
		const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}/${MONGODB_DBNAME}`;
        cached.promise = mongoose
            .connect(uri, {
				auth: {
					username: MONGODB_USER,
					password: MONGODB_PASS
				},
				serverApi: { version: '1', strict: true, deprecationErrors: true },
				authSource: MONGODB_AUTHSOURCE,
				appName: MONGODB_APPNAME,
                dbName: MONGODB_DBNAME
			})
            .then(async mongoose => {
                return mongoose;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;