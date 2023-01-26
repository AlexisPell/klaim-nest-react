import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';
import { Author } from 'src/author/author.model';

export interface QuoteAttributes {
  id: number;
  author: Author;
  authorId: number;
  quote: string;
  createdAt: Date;
  updatedAt: Date;
}

export type QuoteCreationAttrs = Optional<QuoteAttributes, 'id'>;

@Table({ tableName: 'quotes' })
export class Quote
  extends Model<QuoteAttributes, QuoteCreationAttrs>
  implements QuoteAttributes
{
  @ApiProperty({ example: '1', description: 'Quote ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Code fast die old', description: 'qutation itself' })
  @Column({ type: DataType.STRING, allowNull: false })
  quote: string;

  @ApiProperty({ description: 'Timestamp' })
  @Column({ type: DataType.TIME })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp' })
  @Column({ type: DataType.TIME })
  updatedAt: Date;

  @ApiProperty({ type: Author, description: 'Author model' })
  @BelongsTo(() => Author)
  author: Author;

  @ApiProperty({ type: Number, description: 'Author id' })
  @ForeignKey(() => Author)
  authorId: number;
}
