import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';
import { Quote } from 'src/quote/quote.model';

export interface AuthorAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  quotes: Quote[];
}

export type AuthorCreationAttrs = Optional<AuthorAttributes, 'id'>;

@Table({ tableName: 'authors' })
export class Author
  extends Model<AuthorAttributes, AuthorCreationAttrs>
  implements AuthorAttributes
{
  @ApiProperty({ example: '1', description: 'Author ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Walt Disney', description: 'Author name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ description: 'Timestamp' })
  @Column({ type: DataType.TIME })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp' })
  @Column({ type: DataType.TIME })
  updatedAt: Date;

  @ApiProperty({ type: Quote })
  @HasMany(() => Quote)
  quotes: Quote[];
}
