// Model for a Notification created by an User

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import TreasuryBond from './TreasuryBond';
import User from './User';

/* Whether the user wants to be notified when the bond's annual rate is
 * greater than or less than the given value
 */
export type NotificationType = 'maior' | 'menor';
/**
 * @class nType
 * @description Enum for the NotificationType
 * @see NotificationType
 * @see Notification
 */
export enum nType {
  GREATER = 'maior',
  LESS = 'menor',
}

@Entity('notifications')
/**
 * @class Notification
 * @public
 * @description A Notification is a notification request created by an User concerning mainly a TreasuryBond and a value for the bond rate.
 * @property {number} id - The id of the Notification.
 * @property {User} user - The User that created the Notification.
 * @property {TreasuryBond} treasuryBond - The TreasuryBond that the Notification is set to watch.
 * @property {number} value - The value for the bond rate that the Notification must check against.
 * @property {NotificationType} type - Whether to check if the bond rate is above or below the {value}.
 * @property {boolean} active - Whether the Notification is active or not.
 * @property {boolean} notifyByBrowser - Whether the User should be notified by the browser or not.
 * @property {boolean} notifyByEmail - Whether the User should be notified by the email or not.
 *
 */
class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => TreasuryBond)
  @JoinColumn({ name: 'treasurybond_id' })
  bond: TreasuryBond;

  @Column('numeric')
  value: number;

  @Column('enum', { enum: nType })
  type: nType;

  @Column('boolean')
  notifyByEmail: boolean;

  @Column('boolean')
  notifyByBrowser: boolean;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Notification;
