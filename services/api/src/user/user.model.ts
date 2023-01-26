import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  fullname: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreationAttrs = Optional<UserAttributes, 'id'>;

@Table({ tableName: 'users' })
export class User
  extends Model<UserAttributes, UserCreationAttrs>
  implements UserAttributes
{
  @ApiProperty({ example: '1', description: 'User ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'mymail@gmail.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'my-pswd', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'Alexey Pell', description: "User's name" })
  @Column({ type: DataType.STRING, allowNull: false })
  fullname: string;

  @ApiProperty({ description: 'Timestamp' })
  @Column({ type: DataType.TIME })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp' })
  @Column({ type: DataType.TIME })
  updatedAt: Date;
}
