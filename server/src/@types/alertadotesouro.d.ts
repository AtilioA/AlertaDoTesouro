import User from '../models/User';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type UserOptionalPassword = Optional<User, 'password'>;
