import TreasuryBond from './TreasuryBond';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  bond: TreasuryBond;

  @Column('number')
  value: number;

  @Column('number')
  type: number;

  @Column('boolean')
  notifyByEmail: boolean;

  @Column('boolean')
  notifyByBrowser: boolean;
}

export default Notification;
