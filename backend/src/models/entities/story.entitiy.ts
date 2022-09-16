import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Story {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  date: Date;
}
