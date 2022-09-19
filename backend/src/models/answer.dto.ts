import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  answer: string;
}
