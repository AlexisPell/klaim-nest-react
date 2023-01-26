import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class DataTokenResDto {
  @ApiProperty({ type: String })
  token: string;
}

export class TokenDtoResponse {
  @ApiProperty({ type: Boolean })
  success: boolean;

  @ApiProperty({ type: DataTokenResDto })
  @Type(() => DataTokenResDto)
  data: DataTokenResDto;

  constructor(token: string) {
    Object.assign(this, {
      success: true,
      data: {
        token,
      },
    });
  }
}
