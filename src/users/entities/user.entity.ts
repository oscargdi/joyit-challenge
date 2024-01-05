import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The id of the user',
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'The date of the user creation' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @ApiProperty({ description: 'The date of the user update' })
  updatedAt: Date;

  @Column({ unique: true })
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @Column()
  @Exclude()
  password: string;
}
