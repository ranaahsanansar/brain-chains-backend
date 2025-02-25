import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('user_payments')
export class UserPaymentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric', { nullable: true, name: 'paid_at_timestamp' })
  paidAtTimeStamp: number;

  @Column('numeric', { nullable: true, name: 'next_payment_timestamp' })
  nextPaymentTimeStamp: number;

  @Column('numeric', { nullable: true, name: 'amount' })
  amount: number;

  @Column('varchar', { nullable: true, name: 'payment_method' })
  paymentMethod: string;

  @Column('varchar', { nullable: true, name: 'tx_id' })
  txId: string;

  @Column('varchar', { name: 'plan_from', nullable: true })
  planFrom: string;

  @Column('varchar', { name: 'plan_to', nullable: true })
  planTo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.payments)
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity;

  // TODO: Relation with module_id
}
