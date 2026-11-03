import mongoose, { type Mongoose } from "mongoose";
import { ApiError } from "./http";

type MongooseCache = {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache ?? {
  connection: null,
  promise: null,
};

global.mongooseCache = cache;

export function getDatabaseUri(
  env: NodeJS.ProcessEnv = process.env,
): string {
  const isProduction = env.NODE_ENV === "production";
  const variable = isProduction ? "MONGO_URI_PROD" : "MONGO_URI_DEV";
  const expectedDatabase = isProduction
    ? "maa-sharada-db-prod"
    : "maa-sharada-db-dev";
  const uri = env[variable]?.trim();

  if (!uri) {
    throw new ApiError(503, `${variable} is not configured.`);
  }

  const match = uri.match(/^mongodb(?:\+srv)?:\/\/[^/]+\/([^/?]+)(?:\?|$)/i);
  if (!match || match[1] !== expectedDatabase) {
    throw new ApiError(
      503,
      `${variable} must point to the ${expectedDatabase} database.`,
    );
  }

  return uri;
}

export async function connectToDatabase(): Promise<Mongoose> {
  if (cache.connection) {
    return cache.connection;
  }

  const uri = getDatabaseUri();

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cache.connection = await cache.promise;
    return cache.connection;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
}
