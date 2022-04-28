class EmailConfig {
  public host = 'mail.host.com';

  public port = -1;

  public auth = {
    user: 'example@domain.com',
    pass: '',
  };

  public secure = false;

  public tls = { rejectUnauthorized: false };
}

export default new EmailConfig();
