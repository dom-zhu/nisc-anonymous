import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/models/entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async submitAnswers(answers: Answer[]) {
    console.log('submitting answer');
    const t = answers.map(this.validateAnswer);
    const r = await Promise.all(t);
    console.log(r);
  }

  private validateAnswer = async ({ id, answer }: Answer) => {
    try {
      console.log({ id, answer });
      const r = await this.answerRepository.findOneByOrFail({
        id,
      });

      return r;
    } catch (e) {
      console.log('found error');
      throw new HttpException('Invalid answer id', HttpStatus.FORBIDDEN);
    }
  };
}
