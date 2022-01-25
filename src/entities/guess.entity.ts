import { Geometry } from 'geojson';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Guess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guessedLocation: Geometry;

  @Column()
  guessedLocationName: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Location)
  @JoinColumn()
  location: Location;

  @ManyToOne(() => User, (user) => user.guesses)
  user: User;
}
