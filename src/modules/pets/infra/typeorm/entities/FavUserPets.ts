import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';


import { Exclude } from 'class-transformer';
import User from '../../../../users/infra/typeorm/entities/User';
import Pet from '../../../../pets/infra/typeorm/entities/Pet';

@Entity('favsUserPets')
class FavUserPets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: User;

  @Column()
  pet_id: string;

  @ManyToOne(() => Pet)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FavUserPets;