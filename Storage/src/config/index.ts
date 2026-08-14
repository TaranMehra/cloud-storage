import dotenv from "dotenv";
dotenv.config();

export const Port = process.env.PORT;
// export const MONGO_URI = process.env.MONGOSE_URI as string;

//mongo uri it except a uri even in some cases it may be undefined then for that case we must have
// that is only string

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env var: ${key}`);
  }
  return value;
}

export const MONGO_URI = getEnvVar("MONGO_URI");
export const S3_CLUSTER_DB = process.env.CLUSTER_NAME;
export const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;
export const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
export const CLERK_WEBHOOK_SECRET_KEY = getEnvVar("CLERK_WEBHOOK_SECRET_KEY");
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const BUCKET_NAME = process.env.BUCKET_NAME;
// export const CLERK_WEBHOOK_SECRET_KEY = process.env.CLERK_WEBHOOK_SECRET_KEY;
