import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type NotificationType = 'greater' | 'less';
export enum nType {
  GREATER = 'greater',
  LESS = 'less',
}

@Entity('notifications')
class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  value: number;

  @Column('enum', { enum: nType })
  type: nType;

  @Column('boolean')
  notifyByEmail: boolean;

  @Column('boolean')
  notifyByBrowser: boolean;
}

export default Notification;
