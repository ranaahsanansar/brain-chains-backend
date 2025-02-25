import {
  UserAccounStatusEnum,
  UserPaymentStatusEnum,
} from 'src/utils/enums/userEnums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserPaymentsEntity } from './UserPayments';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, name: 'name' })
  name: string;

  @Column('varchar', { nullable: false, unique: true, name: 'email' })
  email: string;

  @Column('varchar', { nullable: false, name: 'password' })
  password: string;

  @Column('enum', {
    enum: UserPaymentStatusEnum,
    default: UserPaymentStatusEnum.PENDING,
    name: 'payment_status',
  })
  paymentStatus: UserPaymentStatusEnum;

  @Column('enum', {
    enum: UserAccounStatusEnum,
    default: UserAccounStatusEnum.IN_CREATION,
    name: 'account_status',
  })
  accountStatus: UserAccounStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => UserPaymentsEntity, (payment) => payment.userId)
  payments: UserPaymentsEntity[];

  // No need to create one to one realtion with Profile
}
