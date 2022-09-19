import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth.service';
import { AnswerService } from 'src/services/answer.service';
import { AnswerDto } from 'src/models/answer.dto';

class SubmitAnswersRequest {
  @ApiProperty({
    isArray: true,
    type: AnswerDto,
  })
  answers: AnswerDto[];
}

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly answerService: AnswerService,
  ) {}

  @Post('/token')
  generateToken() {
    return this.authService.generateToken();
  }

  @Get('/validate/:token')
  validateToken(@Param('token') token: string) {
    return this.authService.validateToken(token);
  }

  @Post('/submitAnswers')
  submitAnswers(@Body() body: SubmitAnswersRequest) {
    return this.answerService.submitAnswers(body.answers);
  }
}
