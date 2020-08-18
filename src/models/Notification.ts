import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import TreasuryBond from './TreasuryBond';

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

  @ManyToOne(type => TreasuryBond, treasuryBond => treasuryBond.notifications)
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
}

export default Notification;
