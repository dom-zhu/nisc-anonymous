import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/models/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async generateToken() {
    return await this.tokenRepository.save({});
  }

  async validateToken(token: string) {
    try {
      await this.tokenRepository.findOneByOrFail({
        id: token,
      });

      return;
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }
}
