import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guess } from './guess.entity';
import { Token } from './token.entity';
import { Location } from './location.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Guess, (guess) => guess.user)
  guesses: Guess[];

  @OneToMany(() => Location, (location) => location.user)
  locations: Location[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
