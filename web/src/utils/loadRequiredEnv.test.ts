import loadRequiredEnv from './loadRequiredEnv';

describe('loadRequiredEnv', () => {
  test('loads variable', () => {
    const envName = 'TEST_ENV_VARIABLE';
    process.env[envName] = 'test';
    expect(loadRequiredEnv(envName)).toBe('test');
  });

  test('throws error when unset', () => {
    const envName = 'TEST_ENV_VARIABLE_UNSET';
    // toThrow assertion needs to be called from a wrapping function
    expect(() => loadRequiredEnv(envName)).toThrow(
      `Undefined required env '${envName}'. Please define it in your environment.`,
    );
  });
});
