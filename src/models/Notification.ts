import TreasuryBond from './TreasuryBond';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('jsonb')
  // bond: TreasuryBond;

  @Column('int')
  value: number;

  @Column('int')
  type: number;

  @Column('boolean')
  notifyByEmail: boolean;

  @Column('boolean')
  notifyByBrowser: boolean;
}

export default Notification;
