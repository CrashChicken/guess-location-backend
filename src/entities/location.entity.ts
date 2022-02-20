import { Point } from 'geojson';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
//import { Image } from './image.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;

  //@Column()
  //locationName: string;

  @CreateDateColumn()
  createdAt: Date;

  /*@UpdateDateColumn()
  updatedAt: Date;*/

  @Column({ nullable: true })
  image: string;

  //@OneToMany(() => Image, (image) => image.location)
  //images: Image[];

  @ManyToOne(() => User, (user) => user.locations)
  user: User;
}
