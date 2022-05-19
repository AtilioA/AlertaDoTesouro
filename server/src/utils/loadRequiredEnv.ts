/**
 * @public
 * @function loadRequiredEnv
 * @description Tries to load an environment variable and throws an error if it is not available. This is used to load _required_ environment variables
 * @param {string} envName - The name of the environment variable to load
 * @returns {string} The value of the environment variable
 * @throws Error If the environment variable is not available
 * 
 */
export default function loadEnvOrThrow(envName: string): string {
  const env = process.env[`${envName}`];
  if (env === undefined) {
    throw new Error(
      `Undefined required env '${envName}'. Please define it in your environment.`,
    );
  }
  return env;
}
