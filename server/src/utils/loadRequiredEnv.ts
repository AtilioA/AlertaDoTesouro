/** Tries to load environment and throws if they are not available. This is used to load required environment variables */
export default function loadEnvOrThrow(envName: string): string {
  const env = process.env[`${envName}`];
  if (env === undefined) {
    throw new Error(
      `Undefined required env '${envName}'. Please define it in yout environment.`,
    );
  }
  return env;
}
