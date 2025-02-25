import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('user_profile')
export class UserProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true, name: 'avatar' })
  avatar: string;

  @Column('text', { nullable: true, name: 'bio' })
  bio: string;

  @Column('varchar', { nullable: true, name: 'linkedin_url' })
  linkedinUrl: string;

  @Column('varchar', { nullable: true, name: 'phone_number' })
  phoneNumber: string;

  @Column('varchar', { nullable: true, name: 'country_code' })
  countryCode: string;

  @Column('varchar', { nullable: true, name: 'roll_number' })
  rollNumber: string;

  @Column('varchar', { nullable: true, name: 'profession_title' })
  professionTitle: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity;
}
