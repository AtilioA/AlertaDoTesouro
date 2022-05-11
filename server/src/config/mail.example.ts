class EmailConfig {
  public host = 'mail.host.com';
  public port = -1;
  public auth = {
    user: 'example@domain.com',
    pass: 'password',
  };
  public secure = false;
  public tls = { rejectUnauthorized: false, ciphers:'SSLv3' };
}

export default new EmailConfig();
