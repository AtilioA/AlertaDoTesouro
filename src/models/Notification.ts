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
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

/* Whether the user wants to be notified when the bond's annual rate is
 * greater than or less than the given value
 */
export type NotificationType = 'greater' | 'less';
export enum nType {
  GREATER = 'greater',
  LESS = 'less',
}

@Entity('notifications')
class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  bond_id: string;

  @ManyToOne(type => TreasuryBond)
  @JoinColumn({ name: 'treasurybond_id' })
  bond: TreasuryBond;

  @Column('int')
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
