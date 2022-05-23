// Model for an user of the platform

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * @class User
 * @description Model for an user of the platform
 * @property {number} id - User id
 * @property {string} email - User's email
 * @param {string} password - User's hashed password
 * @property {boolean} confirmed - Whether the user's email has been confirmed
 * @property {boolean} notify - Whether the user wants to receive notifications
 * @property {boolean} notifyByBrowser - Whether the user wants to receive notifications by browser
 * @property {boolean} notifyByEmail - Whether the user wants to receive notifications by email
 *
 */
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('boolean')
  confirmed: boolean;

  @Column('boolean')
  notify: boolean;

  @Column('boolean')
  notifyByEmail: boolean;

  @Column('boolean')
  notifyByBrowser: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default User;
