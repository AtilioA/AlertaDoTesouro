type User = {
  id: string;
  email: string;
  confirmed: boolean;
  notify: boolean;
  notifyByEmail: boolean;
  notifyByBrowser: boolean;
  created_at: string;
  updated_at: string;
};

export default User;
