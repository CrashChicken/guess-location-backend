import { Geometry } from 'geojson';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
//import { Image } from './image.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Geometry;

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
