import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/models/entities/comment.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Comment)
    private storiesRepository: Repository<Comment>,
  ) {}

  getStories(): Promise<Comment[]> {
    return this.storiesRepository.find();
  }

  async addStory(content: string): Promise<Comment> {
    return this.storiesRepository.save({ content, type: 'story' });
  }

  async addStoryComment({
    content,
    storyId,
  }: {
    content: string;
    storyId: string;
  }) {
    const parentStory = await this.storiesRepository.findOne({
      where: {
        id: storyId,
      },
    });

    return this.storiesRepository.save({
      content,
      type: 'comment',
      parentId: parentStory.id,
    });
  }
}
