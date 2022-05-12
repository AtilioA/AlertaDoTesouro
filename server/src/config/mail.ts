import loadEnvOrThrow from '../utils/loadRequiredEnv';

class EmailConfig {
  public host = loadEnvOrThrow('MAIL_HOST');

  public port = loadEnvOrThrow('MAIL_PORT');

  public auth = {
    user: loadEnvOrThrow('MAIL_USER'),
    pass: loadEnvOrThrow('MAIL_PASSWORD'),
  };

  public secure = loadEnvOrThrow('MAIL_SECURE') === 'true';

  public tls = { rejectUnauthorized: false };
}

export default new EmailConfig();
