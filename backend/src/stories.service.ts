import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from 'src/models/entities/story.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private storiesRepository: Repository<Story>,
  ) {}

  getStories(): Promise<Story[]> {
    return this.storiesRepository.find();
  }

  async addStory(content: string): Promise<Story> {
    return this.storiesRepository.save({ content });
  }
}
