import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { StoriesService } from './stories.service';

class AddStoryRequest {
  @ApiProperty()
  content: string;
}

@Controller()
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get('/stories')
  getStories() {
    return this.storiesService.getStories();
  }

  @Post('/story')
  addStory(@Body() body: AddStoryRequest) {
    return this.storiesService.addStory(body.content);
  }
}
